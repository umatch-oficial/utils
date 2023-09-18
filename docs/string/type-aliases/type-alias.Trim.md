[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > Trim

# Type alias: Trim`<S>`

> **Trim**: \<`S`\> `S` _extends_ \` $\{infer After}\` ? [`Trim`](type-alias.Trim.md)\< `After` \> : `S` *extends* \`$\{infer Before} \` ? [`Trim`](type-alias.Trim.md)\< `Before` \> : `S`

Trims both ends of a string.

## Type parameters

| Parameter              |
| :--------------------- |
| `S` _extends_ `string` |

## Source

[src/string/index.ts:30](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L30)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
