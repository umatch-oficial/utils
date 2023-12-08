**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / TransformValues

# Type alias: TransformValues\<T, A, B\>

> **TransformValues**\<`T`, `A`, `B`\>: `{ [K in keyof T]: T[K] extends A ? B : T[K] extends A | undefined ? B | undefined : T[K] }`

Changes the type of values matching A to B

## Type parameters

• **T**

• **A**

• **B**

## Source

[src/index.ts:56](https://github.com/umatch-oficial/utils/blob/c1935bc/src/index.ts#L56)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
