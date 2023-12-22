**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / parseFunctionCall

# Function: parseFunctionCall()

> **parseFunctionCall**(`str`): [`string`, [`Primitive`](../../index/type-aliases/Primitive.md)[]]

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

## Source

[src/string/index.ts:375](https://github.com/umatch-oficial/utils/blob/6e00801/src/string/index.ts#L375)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
