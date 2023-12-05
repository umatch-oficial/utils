[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [csv](../README.md) > titleCaseRows

# Function: titleCaseRows()

> **titleCaseRows**(
> `input`,
> `output`,
> `options`?,
> `csvOptions`?): `void`

Applies the titleCase function to all rows, then saves to the
output file.

## Parameters

| Parameter            | Type                                                     | Description                                                       |
| :------------------- | :------------------------------------------------------- | :---------------------------------------------------------------- |
| `input`              | `string`                                                 | The path to the input file                                        |
| `output`             | `string`                                                 | The path to the output file                                       |
| `options`?           | `object`                                                 |                                                                   |
| `options.columns`?   | (`string` \| `number`)[]                                 | Which columns to process, if specified                            |
| `options.skipWords`? | `string`[]                                               | Words that should not be capitalized. Default: english skip words |
| `csvOptions`?        | [`CsvOptions`](../type-aliases/type-alias.CsvOptions.md) | Parsing options                                                   |

## Returns

`void`

## Source

[src/csv/index.ts:71](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/csv/index.ts#L71)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
