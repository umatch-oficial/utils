**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / Join

# Type alias: Join\<L, R, Sep\>

> **Join**\<`L`, `R`, `Sep`\>: `L` extends `string` \| `number` ? `R` extends `string` \| `number` ? \`${L}${Sep}${R}\` : `L` : `R` extends `string` \| `number` ? `R` : `undefined`

Joins two strings or numbers unless either one is undefined.

## Type parameters

• **L** extends `PropertyKey` \| `undefined` = `undefined`

• **R** extends `PropertyKey` \| `undefined` = `undefined`

• **Sep** extends `string` = `"."`

## Source

[src/index.ts:123](https://github.com/umatch-oficial/utils/blob/ed8915b/src/index.ts#L123)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
