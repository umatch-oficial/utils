**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / basicPluralizer

# Function: basicPluralizer()

> **basicPluralizer**(`word`, `quantity`?, `plural`?): `string`

Pluralizes the word if *quantity* is undefined, 0 or
greater than 1. Uses the given plural or adds an 's' to the end.

## Parameters

• **word**: `string`

• **quantity?**: `number`

• **plural?**: `string`

## Returns

`string`

## Example

```ts
// returns 'developers'
basicPluralizer('developer')
// returns 'developer'
basicPluralizer('developer', 1)
// returns 'developers'
basicPluralizer('developer', 2)
```

## Source

[src/string/index.ts:62](https://github.com/umatch-oficial/utils/blob/f37b7e4/src/string/index.ts#L62)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
