**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / Uniques

# Type alias: Uniques\<T, Acc\>

> **Uniques**\<`T`, `Acc`\>: `T` extends readonly [infer A, `...(infer B)`] ? `A` extends `Acc`\[`number`\] ? [`Uniques`](Uniques.md)\<`B`, `Acc`\> : [`Uniques`](Uniques.md)\<`B`, [`...Acc`, `A`]\> : `Acc`

## Type parameters

• **T** extends readonly `unknown`[]

• **Acc** extends `unknown`[] = []

## Source

[src/array/index.ts:413](https://github.com/umatch-oficial/utils/blob/4c813c4/src/array/index.ts#L413)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
