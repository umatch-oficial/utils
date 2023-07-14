[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > SnakeToCamelCaseKeys

# Type alias: SnakeToCamelCaseKeys`<T>`

> **SnakeToCamelCaseKeys**: \<`T`\> `{ [K in keyof T as SnakeToCamelCase<K & string>]: T[K] }`

Applies SnakeToCamelCase on the keys of an object.

## Type parameters

| Parameter                                                                       |
| :------------------------------------------------------------------------------ |
| `T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) |

## Source

[src/object/index.ts:45](https://github.com/umatch-oficial/utils/blob/106c322/src/object/index.ts#L45)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
