[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > NestedPaths

# Type alias: NestedPaths`<T, Base, Prev>`

> **NestedPaths**: \<`T`, `Base`, `Prev`\> `T` _extends_ [`Dictionary`](type-alias.Dictionary.md) ? [`ValueOf`](type-alias.ValueOf.md)\< `{ [K in keyof T]: T[K] extends Dictionary ? NestedPaths<T[K], Union<Base, Prev>, Join<Prev, K>> : Union<Base, Union<Prev, Join<Prev, K>>> }` \> : `string`

Takes an object and returns a union of all the deep paths
to properties in it, using dot notation.

## Type parameters

| Parameter                                     | Default     |
| :-------------------------------------------- | :---------- |
| `T`                                           | -           |
| `Base` _extends_ `PropertyKey` \| `undefined` | `undefined` |
| `Prev` _extends_ `PropertyKey` \| `undefined` | `undefined` |

## Source

[src/index.ts:148](https://github.com/umatch-oficial/utils/blob/618b1ef/src/index.ts#L148)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
