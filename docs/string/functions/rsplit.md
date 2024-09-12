[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / rsplit

# Function: rsplit()

```ts
function rsplit(
   str, 
   n?, 
   sep?): string[]
```

Splits a string starting from the right, stops after n splits.
(equivalent of python's rsplit)

## Parameters

• **str**: `undefined` \| `null` \| `string`

• **n?**: `number` = `-1`

number of splits

• **sep?**: `string` = `','`

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

## Defined in

[src/string/index.ts:503](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L503)
