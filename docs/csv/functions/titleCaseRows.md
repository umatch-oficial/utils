**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [csv](../index.md) / titleCaseRows

# Function: titleCaseRows()

> **titleCaseRows**(`input`, `output`, `options`?, `csvOptions`?): `void`

Applies the titleCase function to all rows, then saves to the
output file.

## Parameters

• **input**: `string`

The path to the input file

• **output**: `string`

The path to the output file

• **options?**: `Object`

• **options\.columns?**: (`string` \| `number`)[]

Which columns to process, if specified

• **options\.skipWords?**: `string`[]

Words that should not be capitalized. Default: english skip words

• **csvOptions?**: [`CsvOptions`](../type-aliases/CsvOptions.md)

Parsing options

## Returns

`void`

## Source

[src/csv/index.ts:71](https://github.com/umatch-oficial/utils/blob/ed8915b/src/csv/index.ts#L71)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
