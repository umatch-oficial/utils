**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / getDeepProperty

# Function: getDeepProperty()

> **getDeepProperty**(`obj`, `str`, `sep`): `unknown`

Returns a deep property of an object given a path-like string.

## Parameters

• **obj**: readonly `unknown`[] \| [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **str**: `string`

• **sep**: `string`= `'.'`

## Returns

`unknown`

## Example

```ts
// returns 9
getDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]')
```

## Source

[src/object/index.ts:232](https://github.com/umatch-oficial/utils/blob/6e00801/src/object/index.ts#L232)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
