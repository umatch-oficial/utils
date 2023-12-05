[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > Unquote

# Type alias: Unquote`<S, Quote>`

> **Unquote**: \<`S`, `Quote`\> `"'"` _extends_ `Quote` ? `S` _extends_ \`'$\{infer Middle}'\` ? `Middle` : `"\""` *extends* `Quote` ? `S` *extends* \`"$\{infer Middle}"\` ? `Middle` : `S` : `S` : `S` _extends_ \`"$\{infer Middle}"\` ? `Middle` : `S`

Removes quotes from the start and end of a string.

## Type parameters

| Parameter                         | Default         |
| :-------------------------------- | :-------------- |
| `S` _extends_ `string`            | -               |
| `Quote` _extends_ `"'"` \| `"\""` | `"'"` \| `"\""` |

## Source

[src/string/index.ts:38](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/string/index.ts#L38)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
