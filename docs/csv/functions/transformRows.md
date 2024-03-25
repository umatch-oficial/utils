**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [csv](../index.md) / transformRows

# Function: transformRows()

> **transformRows**(`input`, `output`, `mapValues`, `csvOptions`?): `void`

Applies the mapValues function to all rows, then saves to the
output file.

## Parameters

• **input**: `string`

The path to the input file

• **output**: `string`

The path to the output file

• **mapValues**: (`args`) => `any`

A function that takes the index, header and value of a row and returns a string

• **csvOptions?**: [`CsvOptions`](../type-aliases/CsvOptions.md)

Parsing options

## Returns

`void`

## Source

[src/csv/index.ts:101](https://github.com/umatch-oficial/utils/blob/0b3210d/src/csv/index.ts#L101)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
