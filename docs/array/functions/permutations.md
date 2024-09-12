[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / permutations

# Function: permutations()

```ts
function permutations<T>(array): T extends readonly infer R[] ? [R, R][] : never
```

Returns all length-2 tuples of the elements, in sorted order,
without repeated elements.<br>
(equivalent of python's itertools' combinations)

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Parameters

• **array**: `T`

## Returns

`T` *extends* readonly infer R[] ? [`R`, `R`][] : `never`

## Defined in

[src/array/index.ts:282](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L282)
