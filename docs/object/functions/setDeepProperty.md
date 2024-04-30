**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / setDeepProperty

# Function: setDeepProperty()

> **setDeepProperty**(`obj`, `str`, `value`, `sep`): `unknown`

Sets a deep property of an object given a path-like string.

## Parameters

• **obj**: readonly `unknown`[] \| [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **str**: `string`

• **value**: `unknown`

• **sep**: `string`= `'.'`

## Returns

`unknown`

## Example

```ts
// returns { a: { b: [2,3,5] } }
setDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]', 5)
```

## Throws

if some object in the path is an array, but the next key is not a number.

## Source

[src/object/index.ts:392](https://github.com/umatch-oficial/utils/blob/ed8915b/src/object/index.ts#L392)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
