**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / TransformValues

# Type alias: TransformValues\<T, A, B\>

> **TransformValues**\<`T`, `A`, `B`\>: `{ [K in keyof T]: A extends T[K] ? B | Exclude<T[K], A> : T[K] }`

Changes the type of values matching A to B

## Type parameters

• **T**

• **A**

• **B**

## Source

[src/index.ts:56](https://github.com/umatch-oficial/utils/blob/0b3210d/src/index.ts#L56)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
