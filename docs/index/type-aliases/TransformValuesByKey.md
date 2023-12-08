**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / TransformValuesByKey

# Type alias: TransformValuesByKey\<T, A, B\>

> **TransformValuesByKey**\<`T`, `A`, `B`\>: `{ [K in keyof T]: K extends A ? T[K] extends undefined ? B | undefined : B : T[K] }`

Changes the type of value to B for keys in A

## Type parameters

• **T**

• **A** extends keyof `T`

• **B**

## Source

[src/index.ts:50](https://github.com/umatch-oficial/utils/blob/c1935bc/src/index.ts#L50)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
