**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / Trim

# Type alias: Trim\<S\>

> **Trim**\<`S`\>: `S` extends \` ${infer After}\` ? [`Trim`](Trim.md)\<`After`\> : `S` extends \`${infer Before} \` ? [`Trim`](Trim.md)\<`Before`\> : `S`

Trims both ends of a string.

## Type parameters

• **S** extends `string`

## Source

[src/string/index.ts:30](https://github.com/umatch-oficial/utils/blob/4c813c4/src/string/index.ts#L30)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
