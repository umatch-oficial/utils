[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [math](../README.md) / nthElement

# Function: nthElement()

```ts
function nthElement<T>(array, n): T[number]
```

Returns the nth element with overflow.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

• **n**: `number`

## Returns

`T`\[`number`\]

## Example

```ts
// returns 1
nthElement([0,1,2,3], 5)
```

## Defined in

[src/math/index.ts:180](https://github.com/umatch-oficial/utils/blob/main/src/math/index.ts#L180)
