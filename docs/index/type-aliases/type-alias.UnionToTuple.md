[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > UnionToTuple

# Type alias: UnionToTuple`<T, Acc>`

> **UnionToTuple**: \<`T`, `Acc`\> [`UnionToIntersection`](type-alias.UnionToIntersection.md)\< `T` _extends_ `never` ? `never` : (`arg`) => `T` \> _extends_ (`_`) => infer W ? [`UnionToTuple`](type-alias.UnionToTuple.md)\< `Exclude`\< `T`, `W` \>, [`W`, `...Acc`] \> : `Acc`

## Type parameters

| Parameter                   | Default |
| :-------------------------- | :------ |
| `T`                         | -       |
| `Acc` _extends_ `unknown`[] | []      |

## Source

[src/index.ts:185](https://github.com/umatch-oficial/utils/blob/51f6213/src/index.ts#L185)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
