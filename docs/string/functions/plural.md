[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / plural

# Function: plural()

```ts
function plural(
   word, 
   quantity?, 
   plural?): string
```

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

## Defined in

[src/string/index.ts:81](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L81)
