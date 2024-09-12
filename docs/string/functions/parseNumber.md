[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / parseNumber

# Function: parseNumber()

```ts
function parseNumber<T>(str, def?): T extends null ? number | null : number
```

Parses a number from the string.

## Type Parameters

• **T** *extends* `null` \| `number` = `number`

## Parameters

• **str**: `undefined` \| `null` \| `string`

• **def?**: `T`

## Returns

`T` *extends* `null` ? `number` \| `null` : `number`

## Throws

if it fails to parse and there is no default value.

## Defined in

[src/string/index.ts:467](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L467)
