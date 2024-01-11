**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / SnakeToCamelCaseKeys

# Type alias: SnakeToCamelCaseKeys\<T\>

> **SnakeToCamelCaseKeys**\<`T`\>: `{ [K in keyof T as SnakeToCamelCase<K & string>]: T[K] }`

Applies SnakeToCamelCase on the keys of an object.

## Type parameters

• **T** extends [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Source

[src/object/index.ts:47](https://github.com/umatch-oficial/utils/blob/7d512db/src/object/index.ts#L47)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
