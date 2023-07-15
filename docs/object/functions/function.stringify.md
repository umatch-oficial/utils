[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > stringify

# Function: stringify()

> **stringify**(
> `obj`,
> `options`?,
> `inheritedIndent`? = `''`): `string`

Similar to JSON.stringify(), but optionally pads entries between
the key and value to make all lines have the same width.

## Parameters

| Parameter               | Type                                                                                        | Default value | Description |
| :---------------------- | :------------------------------------------------------------------------------------------ | :------------ | :---------- |
| `obj`                   | _readonly_ `unknown`[] \| [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) | `undefined`   |             |
| `options`?              | `object`                                                                                    | `undefined`   |             |
| `options.doubleQuotes`? | `boolean`                                                                                   | `undefined`   | -           |
| `options.indent`?       | `number`                                                                                    | `undefined`   | -           |
| `options.pad`?          | `boolean`                                                                                   | `undefined`   | -           |
| `inheritedIndent`?      | `string`                                                                                    | `''`          | -           |

## Returns

`string`

## Source

[src/object/index.ts:459](https://github.com/umatch-oficial/utils/blob/a9008ad/src/object/index.ts#L459)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
