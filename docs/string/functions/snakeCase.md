[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / snakeCase

# Function: snakeCase()

```ts
function snakeCase<S>(str): SnakeCase<S>
```

Converts a string to snake_case.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

## Type Parameters

• **S** *extends* `string`

## Parameters

• **str**: `S`

## Returns

[`SnakeCase`](../type-aliases/SnakeCase.md)\<`S`\>

## Defined in

[src/string/index.ts:724](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L724)
