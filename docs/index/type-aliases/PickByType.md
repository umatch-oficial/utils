**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / PickByType

# Type alias: PickByType\<T, U\>

> **PickByType**\<`T`, `U`\>: `{ [K in keyof T as T[K] extends U | undefined ? K : never]: T[K] }`

From T, picks properties whose values are of type U.

## Type parameters

• **T**

• **U**

## Source

[src/index.ts:67](https://github.com/umatch-oficial/utils/blob/6b2757d/src/index.ts#L67)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
