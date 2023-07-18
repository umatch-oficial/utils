[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > TypeFromPath

# Type alias: TypeFromPath`<O, P>`

> **TypeFromPath**: \<`O`, `P`\> `P` _extends_ `string` ? `O` _extends_ [`Dictionary`](type-alias.Dictionary.md) ? `P` _extends_ _keyof_ `O` ? `O`[`P`] : `P` _extends_ \`$\{infer H}.$\{infer T}\` ? `H` _extends_ _keyof_ `O` ? [`TypeFromPath`](type-alias.TypeFromPath.md)\< `O`[`H`], `T` \> : `never` : `never` : `never` : `unknown`

Takes an object and a path string that uses dot notation
and returns the type of the deep property at the path.

## Type parameters

| Parameter              |
| :--------------------- |
| `O`                    |
| `P` _extends_ `string` |

## Source

[src/index.ts:163](https://github.com/umatch-oficial/utils/blob/618b1ef/src/index.ts#L163)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
