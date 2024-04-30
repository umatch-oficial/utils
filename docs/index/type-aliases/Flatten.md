**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / Flatten

# Type alias: Flatten\<Y, Acc\>

> **Flatten**\<`Y`, `Acc`\>: `Y` extends readonly [infer H, `...(infer T)`] ? `H` extends readonly `unknown`[] ? [`Flatten`](Flatten.md)\<`T`, readonly [`...Acc`, `H`\[`number`\]]\> : [`Flatten`](Flatten.md)\<`T`, readonly [`...Acc`, `H`]\> : `Acc`

Flattens a tuple.

## Type parameters

• **Y** extends readonly `unknown`[]

• **Acc** extends readonly `unknown`[] = []

## Source

[src/index.ts:39](https://github.com/umatch-oficial/utils/blob/ed8915b/src/index.ts#L39)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
