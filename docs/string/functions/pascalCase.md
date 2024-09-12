[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / pascalCase

# Function: pascalCase()

```ts
function pascalCase<S>(str): PascalCase<S>
```

Converts a string to PascalCase.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

## Type Parameters

• **S** *extends* `string`

## Parameters

• **str**: `S`

## Returns

[`PascalCase`](../type-aliases/PascalCase.md)\<`S`\>

## Defined in

[src/string/index.ts:706](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L706)
