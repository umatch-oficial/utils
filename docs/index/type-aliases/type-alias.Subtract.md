[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > Subtract

# Type alias: Subtract`<A, B, Acc>`

> **Subtract**: \<`A`, `B`, `Acc`\> `A` _extends_ _readonly_ [infer H, `...(infer T)`] ? `H` _extends_ `B`[`number`] ? [`Subtract`](type-alias.Subtract.md)\< `T`, `B`, `Acc` \> : [`Subtract`](type-alias.Subtract.md)\< `T`, `B`, _readonly_ [`...Acc`, `H`] \> : `Acc`

Excludes types present in B from A.

## Type parameters

| Parameter                            | Default |
| :----------------------------------- | :------ |
| `A` _extends_ _readonly_ `unknown`[] | -       |
| `B` _extends_ _readonly_ `unknown`[] | -       |
| `Acc` _extends_ _readonly_ `any`[]   | []      |

## Source

[src/index.ts:87](https://github.com/umatch-oficial/utils/blob/106c322/src/index.ts#L87)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
