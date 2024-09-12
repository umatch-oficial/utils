[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [csv](../README.md) / titleCaseRows

# Function: titleCaseRows()

```ts
function titleCaseRows(
   input, 
   output, 
   options?, 
   csvOptions?): void
```

Applies the titleCase function to all rows, then saves to the
output file.

## Parameters

• **input**: `string`

The path to the input file

• **output**: `string`

The path to the output file

• **options?**

• **options.columns?**: (`string` \| `number`)[]

Which columns to process, if specified

• **options.skipWords?**: `string`[]

Words that should not be capitalized. Default: english skip words

• **csvOptions?**: [`CsvOptions`](../type-aliases/CsvOptions.md)

Parsing options

## Returns

`void`

## Defined in

[src/csv/index.ts:71](https://github.com/umatch-oficial/utils/blob/main/src/csv/index.ts#L71)
