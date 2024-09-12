[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / hasSameElements

# Function: hasSameElements()

```ts
function hasSameElements<X, A, B>(a, b): Equals<A[number], B[number]> extends true ? A extends {
  length: infer ALen;
 } ? B extends {
  length: infer BLen;
 } ? Equals<ALen, BLen> extends true ? true : false : false : false : false
```

Returns whether 2 arrays have the same elements, regardless of order.

## Type Parameters

• **X** *extends* `string` \| `number`

• **A** *extends* readonly `X`[]

• **B** *extends* readonly `X`[]

## Parameters

• **a**: `A`

• **b**: `B`

## Returns

[`Equals`](../../index/type-aliases/Equals.md)\<`A`\[`number`\], `B`\[`number`\]\> *extends* `true` ? `A` *extends* \{
  `length`: infer ALen;
 \} ? `B` *extends* \{
  `length`: infer BLen;
 \} ? [`Equals`](../../index/type-aliases/Equals.md)\<`ALen`, `BLen`\> *extends* `true` ? `true` : `false` : `false` : `false` : `false`

## Defined in

[src/array/index.ts:227](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L227)
