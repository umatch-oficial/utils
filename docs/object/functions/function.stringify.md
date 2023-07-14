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

| Parameter               | Type      | Default value | Description |
| :---------------------- | :-------- | :------------ | :---------- |
| `obj`                   | `unknown` | `undefined`   |             |
| `options`?              | `object`  | `undefined`   |             |
| `options.doubleQuotes`? | `boolean` | `undefined`   | -           |
| `options.indent`?       | `number`  | `undefined`   | -           |
| `options.pad`?          | `boolean` | `undefined`   | -           |
| `inheritedIndent`?      | `string`  | `''`          | -           |

## Returns

`string`

## Source

[src/object/index.ts:425](https://github.com/umatch-oficial/utils/blob/106c322/src/object/index.ts#L425)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
