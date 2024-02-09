**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / split

# Function: split()

> **split**(`str`, `n`?, `sep`?): `string`[]

Splits a string starting from the left, stops after n splits.
(equivalent of python's split)

## Parameters

• **str**: `undefined` \| `null` \| `string`

• **n?**: `number`= `-1`

number of splits

• **sep?**: `string`= `','`

separator

## Returns

`string`[]

## Example

```ts
// returns ["a", "b", "c"]
split("a,b,c")
// returns ["a", "b,c"]
split("a,b,c", 1)
```

## Source

[src/string/index.ts:503](https://github.com/umatch-oficial/utils/blob/c6d91fc/src/string/index.ts#L503)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
