**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / Remove

# Type alias: Remove\<T, X, Acc\>

> **Remove**\<`T`, `X`, `Acc`\>: `T` extends readonly [infer A, `...(infer B)`] ? `A` extends `X` ? `X` extends `A` ? [`Remove`](Remove.md)\<`B`, `X`, `Acc`\> : [`Remove`](Remove.md)\<`B`, `X`, [`...Acc`, `A`]\> : [`Remove`](Remove.md)\<`B`, `X`, [`...Acc`, `A`]\> : `Acc`

## Type parameters

• **T** extends readonly `unknown`[]

• **X** extends `T`\[`number`\]

• **Acc** extends `unknown`[] = []

## Source

[src/array/index.ts:298](https://github.com/umatch-oficial/utils/blob/f37b7e4/src/array/index.ts#L298)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
