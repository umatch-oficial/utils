[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > PickByType

# Type alias: PickByType`<T, U>`

> **PickByType**: \<`T`, `U`\> \{ [K in keyof T as T[K] extends U \| undefined ? K : never]: T[K] }

From T, picks properties whose values are of type U.

## Type parameters

| Parameter |
| :-------- |
| `T`       |
| `U`       |

## Source

[src/index.ts:67](https://github.com/umatch-oficial/utils/blob/a4be831/src/index.ts#L67)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
