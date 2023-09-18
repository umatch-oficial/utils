[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > Replace

# Type alias: Replace`<S, Char, NewChar, Acc>`

> **Replace**: \<`S`, `Char`, `NewChar`, `Acc`\> `S` _extends_ \`$\{infer Before}$\{Char}$\{infer After}\` ? [`Replace`](type-alias.Replace.md)\< `After`, `Char`, `NewChar`, \`$\{Acc}$\{Before}$\{NewChar}\` \> : `Acc` _extends_ `""` ? `S` : \`$\{Acc}$\{S}\`

Replaces NewChar with Char in S.

## Type parameters

| Parameter                    | Default |
| :--------------------------- | :------ |
| `S` _extends_ `string`       | -       |
| `Char` _extends_ `string`    | -       |
| `NewChar` _extends_ `string` | -       |
| `Acc` _extends_ `string`     | `""`    |

## Source

[src/string/index.ts:17](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L17)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
