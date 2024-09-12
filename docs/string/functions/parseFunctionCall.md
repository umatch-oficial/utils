[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / parseFunctionCall

# Function: parseFunctionCall()

```ts
function parseFunctionCall(str): [string, Primitive[]]
```

Returns a function name and its arguments from a string. Boolean
and number arguments are parsed. If the function call is not
valid, returns an empty string and an empty array.

## Parameters

• **str**: `string`

## Returns

[`string`, [`Primitive`](../../index/type-aliases/Primitive.md)[]]

## Example

```ts
parseFunctionCall("foo(1, 'bar', true)") // returns ["foo", [1, "bar", true]]
parseFunctionCall("foo(1, 'bar', true) + 1") // returns ["", []]
```

## Defined in

[src/string/index.ts:399](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L399)
