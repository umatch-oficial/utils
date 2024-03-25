**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / Zip

# Type alias: Zip\<T, Acc\>

> **Zip**\<`T`, `Acc`\>: `T` extends readonly [readonly infer A[], `...(infer B)`] ? `B` extends readonly readonly `unknown`[][] ? [`Zip`](Zip.md)\<`B`, [`Append`](Append.md)\<`Acc`, `A`\>\> : `never` : `Acc`[]

## Type parameters

• **T** extends readonly readonly `unknown`[][]

• **Acc** extends readonly `unknown`[] = []

## Source

[src/array/index.ts:436](https://github.com/umatch-oficial/utils/blob/7369e19/src/array/index.ts#L436)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
