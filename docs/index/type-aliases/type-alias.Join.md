[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > Join

# Type alias: Join`<L, R, Sep>`

> **Join**: \<`L`, `R`, `Sep`\> `L` _extends_ `string` \| `number` ? `R` _extends_ `string` \| `number` ? \`$\{L}$\{Sep}$\{R}\` : `L` : `R` _extends_ `string` \| `number` ? `R` : `undefined`

Joins two strings or numbers unless either one is undefined.

## Type parameters

| Parameter                                  | Default     |
| :----------------------------------------- | :---------- |
| `L` _extends_ `PropertyKey` \| `undefined` | `undefined` |
| `R` _extends_ `PropertyKey` \| `undefined` | `undefined` |
| `Sep` _extends_ `string`                   | `"."`       |

## Source

[src/index.ts:117](https://github.com/umatch-oficial/utils/blob/00cf87f/src/index.ts#L117)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)