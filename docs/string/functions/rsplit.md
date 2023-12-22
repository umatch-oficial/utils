**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / rsplit

# Function: rsplit()

> **rsplit**(`str`, `n`?, `sep`?): `string`[]

Splits a string starting from the right, stops after n splits.
(equivalent of python's rsplit)

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
rsplit("a,b,c")
// returns ["a,b", "c"]
rsplit("a,b,c", 1)
```

## Source

[src/string/index.ts:479](https://github.com/umatch-oficial/utils/blob/6e00801/src/string/index.ts#L479)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
