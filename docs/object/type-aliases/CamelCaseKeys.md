**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / CamelCaseKeys

# Type alias: CamelCaseKeys\<T\>

> **CamelCaseKeys**\<`T`\>: `{ [K in keyof T as CamelCase<K & string>]: T[K] }`

Applies camelCase on the keys of an object.

## Type parameters

• **T** extends [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Source

[src/object/index.ts:42](https://github.com/umatch-oficial/utils/blob/1813ff9/src/object/index.ts#L42)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
