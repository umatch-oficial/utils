[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [csv](../README.md) > splitFile

# Function: splitFile()

> **splitFile**(
> `input`,
> `outputs`,
> `options`?): `void`

Splits a file into multiple others.

## Parameters

| Parameter  | Type                                                     | Description                                                                        |
| :--------- | :------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `input`    | `string`                                                 | The path to the input file                                                         |
| `outputs`  | `object`                                                 | A mapping of output file names to the columns that should be included in that file |
| `options`? | [`CsvOptions`](../type-aliases/type-alias.CsvOptions.md) | Parsing options                                                                    |

## Returns

`void`

## Source

[src/csv/index.ts:131](https://github.com/umatch-oficial/utils/blob/00cf87f/src/csv/index.ts#L131)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
