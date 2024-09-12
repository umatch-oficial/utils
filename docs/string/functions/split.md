[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / split

# Function: split()

```ts
function split(
   str, 
   n?, 
   sep?): string[]
```

Splits a string starting from the left, stops after n splits.
(equivalent of python's split)

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
split("a,b,c")
// returns ["a", "b,c"]
split("a,b,c", 1)
```

## Defined in

[src/string/index.ts:529](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L529)
