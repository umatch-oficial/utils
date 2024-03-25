**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / LastLetter

# Type alias: LastLetter\<S, Previous\>

> **LastLetter**\<`S`, `Previous`\>: `S` extends \`${infer First}${infer Rest}\` ? `Rest` extends `""` ? `S` : [`LastLetter`](LastLetter.md)\<`Rest`, `First`\> : `Previous`

Returns the last letter of a string.

## Type parameters

• **S** extends `string`

• **Previous** extends `string` = `""`

## Source

[src/string/index.ts:571](https://github.com/umatch-oficial/utils/blob/0b3210d/src/string/index.ts#L571)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
