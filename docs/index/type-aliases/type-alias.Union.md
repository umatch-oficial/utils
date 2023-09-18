[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > Union

# Type alias: Union`<L, R>`

> **Union**: \<`L`, `R`\> `L` _extends_ `undefined` ? `R` _extends_ `undefined` ? `undefined` : `R` : `R` _extends_ `undefined` ? `L` : `L` \| `R`

Makes a Union between two types removing undefined.

## Type parameters

| Parameter |
| :-------- |
| `L`       |
| `R`       |

## Source

[src/index.ts:137](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/index.ts#L137)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
