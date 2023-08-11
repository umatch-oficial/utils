[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > TransformValuesByKey

# Type alias: TransformValuesByKey`<T, A, B>`

> **TransformValuesByKey**: \<`T`, `A`, `B`\> \{ [K in keyof T]: K extends A ? T[K] extends undefined ? B \| undefined : B : T[K] }

Changes the type of value to B for keys in A

## Type parameters

| Parameter                 |
| :------------------------ |
| `T`                       |
| `A` _extends_ _keyof_ `T` |
| `B`                       |

## Source

[src/index.ts:50](https://github.com/umatch-oficial/utils/blob/51f6213/src/index.ts#L50)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
