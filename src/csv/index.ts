import csv from "csv-parser";
import fs from "fs";

import { filterWithComplement } from "../array";
import { isNumber, type Dictionary } from "../index";
import { apply } from "../object";
import { titleCase } from "../string";

/**
 * @property {BufferEncoding} [encoding] The encoding used to read the input and write the output files
 * @property {string} [endMessage] The message to display when the transformation finishes
 * @property {boolean} [headers] Whether to consider the first row as headers
 * @property {string} [separator] The separator used to read and write files
 */
export type CsvOptions = {
  encoding?: BufferEncoding;
  endMessage?: string;
  headers?: boolean;
  separator?: string;
};

/**
 * Joins strings with the given separator, enclosing them in quotes
 * if they contain the separator.
 */
function safeJoin(parts: string[], separator: string, quote: string = '"'): string {
  return parts
    .map((p) => (p.match(separator) ? `${quote}${p}${quote}` : p))
    .join(separator);
}

/**
 * Returns whether a row's index or header are included in the columns
 * array. If there isn't one, returns true.
 */
function shouldProcessRow(
  row: { index: number; header: string },
  columns?: (string | number)[],
): boolean {
  if (!columns) return true;

  const [indices, headers] = filterWithComplement(columns, isNumber);
  return indices.includes(row.index) || headers.includes(row.header);
}

function appendToFile(
  file: string,
  values: string[],
  separator: string,
  encoding?: BufferEncoding,
) {
  // trim empty lines
  if (!values.length) return;

  const joinedValues = safeJoin(values, separator);
  const line = `${joinedValues}\n`;
  fs.appendFileSync(file, line, { encoding });
}

/**
 * Applies the titleCase function to all rows, then saves to the
 * output file.
 *
 * @param {string} input The path to the input file
 * @param {string} output The path to the output file
 * @param {{ skipWords?: string[]; columns?: (string | number)[] }} options
 * @param {string[]} [options.columns] Which columns to process, if specified
 * @param {string[]} [options.skipWords] Words that should not be capitalized. Default: english skip words
 * @param {CsvOptions} [csvOptions] Parsing options
 */
export function titleCaseRows(
  input: string,
  output: string,
  options?: { skipWords?: string[]; columns?: (string | number)[] },
  csvOptions?: CsvOptions,
) {
  return transformRows(
    input,
    output,
    ({ header, value, index }) => {
      if (typeof value !== "string") return String(value);

      const { columns, skipWords } = options ?? {};
      return shouldProcessRow({ index, header }, columns)
        ? titleCase(value, skipWords)
        : value;
    },
    { endMessage: "Finished title casing rows", ...csvOptions },
  );
}

/**
 * Applies the mapValues function to all rows, then saves to the
 * output file.
 *
 * @param {string} input The path to the input file
 * @param {string} output The path to the output file
 * @param {Exclude<csv.Options["mapValues"], undefined>} mapValues A function that takes the index, header and value of a row and returns a string
 * @param {CsvOptions} [csvOptions] Parsing options
 */
export function transformRows(
  input: string,
  output: string,
  mapValues: Exclude<csv.Options["mapValues"], undefined>,
  csvOptions?: CsvOptions,
) {
  const { encoding, endMessage, headers, separator } = {
    endMessage: "Finished transforming rows",
    separator: ",",
    ...csvOptions,
  };
  const skipLines = headers ? 1 : 0;
  fs.createReadStream(input, { encoding })
    .pipe(csv({ headers, mapValues, separator, skipLines }))
    .on("headers", (headerNames: string[]) =>
      appendToFile(output, headerNames, separator, encoding),
    )
    .on("data", (row: Dictionary) =>
      appendToFile(output, Object.values(row) as string[], separator, encoding),
    )
    .on("end", () => console.log(endMessage));
}

/**
 * Splits a file into multiple others.
 *
 * @param {string} input The path to the input file
 * @param {{ [_:string]: number[] }} outputs A mapping of output file names to the columns that should be included in that file
 * @param {CsvOptions} [options] Parsing options
 */
export function splitFile(
  input: string,
  outputs: { [_: string]: (string | number)[] },
  options?: CsvOptions,
) {
  const { encoding, endMessage, headers, separator } = {
    endMessage: "Finished splitting file",
    separator: ",",
    ...options,
  };
  const skipLines = headers ? 1 : 0;
  fs.createReadStream(input, { encoding })
    .pipe(csv({ headers, separator, skipLines }))
    .on("headers", (headerNames: string[]) => {
      const headersPerFile: { [_: string]: string[] } = apply(outputs, (columns) =>
        headerNames.filter((header, index) =>
          shouldProcessRow({ index, header }, columns),
        ),
      );
      Object.entries(headersPerFile).forEach(([file, fileValues]) =>
        appendToFile(file, fileValues, separator, encoding),
      );
    })
    .on("data", (row) => {
      const valuesPerFile: { [_: string]: string[] } = apply(outputs, (columns) =>
        Object.entries(row).flatMap(([header, value], index) =>
          shouldProcessRow({ index, header }, columns) ? String(value) : [],
        ),
      );
      Object.entries(valuesPerFile).forEach(([file, fileValues]) =>
        appendToFile(file, fileValues, separator, encoding),
      );
    })
    .on("end", () => console.log(endMessage));
}
