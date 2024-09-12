[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / getDeepProperty

# Function: getDeepProperty()

```ts
function getDeepProperty(
   obj, 
   str, 
   sep): unknown
```

Returns a deep property of an object given a path-like string.

## Parameters

• **obj**: readonly `unknown`[] \| [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **str**: `string`

• **sep**: `string` = `'.'`

## Returns

`unknown`

## Example

```ts
// returns 9
getDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]')
```

## Defined in

[src/object/index.ts:229](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L229)
