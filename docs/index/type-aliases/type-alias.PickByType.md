[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > PickByType

# Type alias: PickByType`<T, Value>`

> **PickByType**: \<`T`, `Value`\> \{ [K in keyof T as T[K] extends Value \| undefined ? K : never]: T[K] }

From T, pick a set of properties whose values are of some type.

## Type parameters

| Parameter |
| :-------- |
| `T`       |
| `Value`   |

## Source

[src/index.ts:67](https://github.com/umatch-oficial/utils/blob/a9008ad/src/index.ts#L67)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
