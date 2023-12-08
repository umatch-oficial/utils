**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / KeysByType

# Type alias: KeysByType\<T, U\>

> **KeysByType**\<`T`, `U`\>: `{ [K in keyof T]: U extends T[K] ? K : never }`\[keyof `T`\]

From T, picks keys whose values are of type U.

## Type parameters

• **T**

• **U**

## Source

[src/index.ts:73](https://github.com/umatch-oficial/utils/blob/1c5b195/src/index.ts#L73)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
