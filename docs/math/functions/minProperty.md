[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [math](../README.md) / minProperty

# Function: minProperty()

```ts
function minProperty<T, Prop>(array, property): T[number][Prop] | null
```

Returns the minimum value of the given property of the elements in the array.

The property must be a number, string or Date consistently across all elements.

## Type Parameters

• **T** *extends* readonly `unknown`[]

• **Prop** *extends* `string` \| `number` \| `symbol`

## Parameters

• **array**: `T`

• **property**: `Prop`

## Returns

`T`\[`number`\]\[`Prop`\] \| `null`

## Defined in

[src/math/index.ts:140](https://github.com/umatch-oficial/utils/blob/main/src/math/index.ts#L140)
