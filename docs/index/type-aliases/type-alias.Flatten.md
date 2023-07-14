[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > Flatten

# Type alias: Flatten`<Y, Acc>`

> **Flatten**: \<`Y`, `Acc`\> `Y` _extends_ _readonly_ [infer H, `...(infer T)`] ? `H` _extends_ _readonly_ `unknown`[] ? [`Flatten`](type-alias.Flatten.md)\< `T`, _readonly_ [`...Acc`, `H`[`number`]] \> : [`Flatten`](type-alias.Flatten.md)\< `T`, _readonly_ [`...Acc`, `H`] \> : `Acc`

Flattens a tuple.

## Type parameters

| Parameter                              | Default |
| :------------------------------------- | :------ |
| `Y` _extends_ _readonly_ `unknown`[]   | -       |
| `Acc` _extends_ _readonly_ `unknown`[] | []      |

## Source

[src/index.ts:37](https://github.com/umatch-oficial/utils/blob/106c322/src/index.ts#L37)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
