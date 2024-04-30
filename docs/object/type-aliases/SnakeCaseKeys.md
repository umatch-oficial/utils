**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / SnakeCaseKeys

# Type alias: SnakeCaseKeys\<T\>

> **SnakeCaseKeys**\<`T`\>: `{ [K in keyof T as SnakeCase<K & string>]: T[K] }`

Applies snake_case on the keys of an object.

## Type parameters

• **T** extends [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Source

[src/object/index.ts:424](https://github.com/umatch-oficial/utils/blob/ed8915b/src/object/index.ts#L424)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
