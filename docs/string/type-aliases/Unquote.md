**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / Unquote

# Type alias: Unquote\<S, Quote\>

> **Unquote**\<`S`, `Quote`\>: `"'"` extends `Quote` ? `S` extends \`'${infer Middle}'\` ? `Middle` : `"\""` extends `Quote` ? `S` extends \`"${infer Middle}"\` ? `Middle` : `S` : `S` : `S` extends \`"${infer Middle}"\` ? `Middle` : `S`

Removes quotes from the start and end of a string.

## Type parameters

• **S** extends `string`

• **Quote** extends `"'"` \| `"\""` = `"'"` \| `"\""`

## Source

[src/string/index.ts:39](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L39)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
