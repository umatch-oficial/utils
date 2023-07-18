[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [csv](../README.md) > transformRows

# Function: transformRows()

> **transformRows**(
> `input`,
> `output`,
> `mapValues`,
> `csvOptions`?): `void`

Applies the mapValues function to all rows, then saves to the
output file.

## Parameters

| Parameter     | Type                                                     | Description                                                                     |
| :------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `input`       | `string`                                                 | The path to the input file                                                      |
| `output`      | `string`                                                 | The path to the output file                                                     |
| `mapValues`   | (`args`) => `any`                                        | A function that takes the index, header and value of a row and returns a string |
| `csvOptions`? | [`CsvOptions`](../type-aliases/type-alias.CsvOptions.md) | Parsing options                                                                 |

## Returns

`void`

## Source

[src/csv/index.ts:101](https://github.com/umatch-oficial/utils/blob/618b1ef/src/csv/index.ts#L101)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
