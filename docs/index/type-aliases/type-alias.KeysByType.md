[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > KeysByType

# Type alias: KeysByType`<T, U>`

> **KeysByType**: \<`T`, `U`\> `{ [K in keyof T]: U extends T[K] ? K : never }`[*keyof* `T`]

From T, picks keys whose values are of type U.

## Type parameters

| Parameter |
| :-------- |
| `T`       |
| `U`       |

## Source

[src/index.ts:73](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/index.ts#L73)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
