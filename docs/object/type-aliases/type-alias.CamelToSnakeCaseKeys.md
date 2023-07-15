[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > CamelToSnakeCaseKeys

# Type alias: CamelToSnakeCaseKeys`<T>`

> **CamelToSnakeCaseKeys**: \<`T`\> `{ [K in keyof T as CamelToSnakeCase<K & string>]: T[K] }`

Applies CamelToSnakeCase on the keys of an object.

## Type parameters

| Parameter                                                                       |
| :------------------------------------------------------------------------------ |
| `T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) |

## Source

[src/object/index.ts:414](https://github.com/umatch-oficial/utils/blob/00cf87f/src/object/index.ts#L414)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
