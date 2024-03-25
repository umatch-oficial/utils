**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / Union

# Type alias: Union\<L, R\>

> **Union**\<`L`, `R`\>: `L` extends `undefined` ? `R` extends `undefined` ? `undefined` : `R` : `R` extends `undefined` ? `L` : `L` \| `R`

Makes a Union between two types removing undefined.

## Type parameters

• **L**

• **R**

## Source

[src/index.ts:137](https://github.com/umatch-oficial/utils/blob/7369e19/src/index.ts#L137)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
