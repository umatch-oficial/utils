[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > NestedPaths

# Type alias: NestedPaths`<O, Base, Prev>`

> **NestedPaths**: \<`O`, `Base`, `Prev`\> `O` _extends_ [`Dictionary`](type-alias.Dictionary.md) ? [`ValueOf`](type-alias.ValueOf.md)\< `{ [K in keyof O]: O[K] extends Dictionary ? NestedPaths<O[K], Union<Base, Prev>, Join<Prev, K>> : Union<Base, Union<Prev, Join<Prev, K>>> }` \> : `string`

Takes an object and returns a union of all the deep paths
to properties in it, using dot notation.

## Type parameters

| Parameter                                                           | Default     |
| :------------------------------------------------------------------ | :---------- |
| `O` _extends_ [`Dictionary`](type-alias.Dictionary.md) \| `unknown` | -           |
| `Base` _extends_ `PropertyKey` \| `undefined`                       | `undefined` |
| `Prev` _extends_ `PropertyKey` \| `undefined`                       | `undefined` |

## Source

[src/index.ts:143](https://github.com/umatch-oficial/utils/blob/106c322/src/index.ts#L143)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
