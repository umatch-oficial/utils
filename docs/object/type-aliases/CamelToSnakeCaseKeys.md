**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / CamelToSnakeCaseKeys

# Type alias: CamelToSnakeCaseKeys\<T\>

> **CamelToSnakeCaseKeys**\<`T`\>: `{ [K in keyof T as CamelToSnakeCase<K & string>]: T[K] }`

Applies CamelToSnakeCase on the keys of an object.

## Type parameters

• **T** extends [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Source

[src/object/index.ts:427](https://github.com/umatch-oficial/utils/blob/f37b7e4/src/object/index.ts#L427)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
