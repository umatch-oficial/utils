**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / UnionToTuple

# Type alias: UnionToTuple\<T, Acc\>

> **UnionToTuple**\<`T`, `Acc`\>: [`UnionToIntersection`](UnionToIntersection.md)\<`T` extends `never` ? `never` : (`arg`) => `T`\> extends (`_`) => infer W ? [`UnionToTuple`](UnionToTuple.md)\<`Exclude`\<`T`, `W`\>, [`W`, `...Acc`]\> : `Acc`

## Type parameters

• **T**

• **Acc** extends `unknown`[] = []

## Source

[src/index.ts:188](https://github.com/umatch-oficial/utils/blob/ed8915b/src/index.ts#L188)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
