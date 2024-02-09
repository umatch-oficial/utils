**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / Replace

# Type alias: Replace\<S, Char, NewChar, Acc\>

> **Replace**\<`S`, `Char`, `NewChar`, `Acc`\>: `S` extends \`${infer Before}${Char}${infer After}\` ? [`Replace`](Replace.md)\<`After`, `Char`, `NewChar`, \`${Acc}${Before}${NewChar}\`\> : `Acc` extends `""` ? `S` : \`${Acc}${S}\`

Replaces NewChar with Char in S.

## Type parameters

• **S** extends `string`

• **Char** extends `string`

• **NewChar** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:17](https://github.com/umatch-oficial/utils/blob/c6d91fc/src/string/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
