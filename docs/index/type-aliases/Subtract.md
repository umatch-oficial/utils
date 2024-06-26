**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / Subtract

# Type alias: Subtract\<A, B, Acc\>

> **Subtract**\<`A`, `B`, `Acc`\>: `A` extends readonly [infer H, `...(infer T)`] ? `H` extends `B`\[`number`\] ? [`Subtract`](Subtract.md)\<`T`, `B`, `Acc`\> : [`Subtract`](Subtract.md)\<`T`, `B`, readonly [`...Acc`, `H`]\> : `Acc`

Excludes types present in B from A.

## Type parameters

• **A** extends readonly `unknown`[]

• **B** extends readonly `unknown`[]

• **Acc** extends readonly `unknown`[] = []

## Source

[src/index.ts:95](https://github.com/umatch-oficial/utils/blob/6b2757d/src/index.ts#L95)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
