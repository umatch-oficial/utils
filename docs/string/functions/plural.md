**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / plural

# Function: plural()

> **plural**(`word`, `quantity`?, `plural`?): `string`

Pluralizes the word if *quantity* is undefined or not 1. Uses the
given plural or adds an 's' to the end.

## Parameters

• **word**: `string`

• **quantity?**: `number`

• **plural?**: `string`

## Returns

`string`

## Example

```ts
// returns 'developers'
plural('developer')
// returns 'developer'
plural('developer', 1)
// returns 'developers'
plural('developer', 2)
```

## Source

[src/string/index.ts:13](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L13)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
