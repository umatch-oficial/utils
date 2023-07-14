[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > parseFunctionCall

# Function: parseFunctionCall()

> **parseFunctionCall**(`str`): [`string`, [`Primitive`](../../index/type-aliases/type-alias.Primitive.md)[]]

Returns a function name and its arguments from a string. Boolean
and number arguments are parsed. If the function call is not
valid, returns an empty string and an empty array.

## Example

```ts
parseFunctionCall("foo(1, 'bar', true)"); // returns ["foo", [1, "bar", true]]
parseFunctionCall("foo(1, 'bar', true) + 1"); // returns ["", []]
```

## Parameters

| Parameter | Type     |
| :-------- | :------- |
| `str`     | `string` |

## Returns

[`string`, [`Primitive`](../../index/type-aliases/type-alias.Primitive.md)[]]

## Source

[src/string/index.ts:375](https://github.com/umatch-oficial/utils/blob/106c322/src/string/index.ts#L375)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
