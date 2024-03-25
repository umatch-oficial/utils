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

[src/string/index.ts:38](https://github.com/umatch-oficial/utils/blob/7369e19/src/string/index.ts#L38)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
