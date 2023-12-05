[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > TransformValues

# Type alias: TransformValues`<T, A, B>`

> **TransformValues**: \<`T`, `A`, `B`\> \{ [K in keyof T]: T[K] extends A ? B : T[K] extends A \| undefined ? B \| undefined : T[K] }

Changes the type of values matching A to B

## Type parameters

| Parameter |
| :-------- |
| `T`       |
| `A`       |
| `B`       |

## Source

[src/index.ts:56](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/index.ts#L56)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
