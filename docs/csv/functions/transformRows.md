[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [csv](../README.md) / transformRows

# Function: transformRows()

```ts
function transformRows(
   input, 
   output, 
   mapValues, 
   csvOptions?): void
```

Applies the mapValues function to all rows, then saves to the
output file.

## Parameters

• **input**: `string`

The path to the input file

• **output**: `string`

The path to the output file

• **mapValues**

A function that takes the index, header and value of a row and returns a string

• **csvOptions?**: [`CsvOptions`](../type-aliases/CsvOptions.md)

Parsing options

## Returns

`void`

## Defined in

[src/csv/index.ts:101](https://github.com/umatch-oficial/utils/blob/main/src/csv/index.ts#L101)
