[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > SnakeToCamelCase

# Type alias: SnakeToCamelCase`<S, Acc>`

> **SnakeToCamelCase**: \<`S`, `Acc`\> `S` _extends_ \`$\{infer H}\_$\{infer T}\` ? [`SnakeToCamelCase`](type-alias.SnakeToCamelCase.md)\< `Capitalize`\< `T` \>, \`$\{Acc}$\{H}\` \> : `S` _extends_ \`$\{infer H}$\{infer T}\` ? [`SnakeToCamelCase`](type-alias.SnakeToCamelCase.md)\< `T`, \`$\{Acc}$\{H}\` \> : `Acc`

Converts a string from snake to camel case.

## Type parameters

| Parameter                | Default |
| :----------------------- | :------ |
| `S` _extends_ `string`   | -       |
| `Acc` _extends_ `string` | `""`    |

## Source

[src/string/index.ts:573](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L573)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
