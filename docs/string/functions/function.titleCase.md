[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > titleCase

# Function: titleCase()

> **titleCase**(`str`, `skipWords`? = `ENGLISH_SKIP_WORDS`): `string`

Converts a string to Title Case.

Some words should not be capitalized, depending on the language.

## Parameters

| Parameter    | Type                  | Default value        | Description                                                               |
| :----------- | :-------------------- | :------------------- | :------------------------------------------------------------------------ |
| `str`        | `string`              | `undefined`          |                                                                           |
| `skipWords`? | _readonly_ `string`[] | `ENGLISH_SKIP_WORDS` | Words to skip. Default: english skip words (articles, prepositions, etc.) |

## Returns

`string`

## Source

[src/string/index.ts:680](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/string/index.ts#L680)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
