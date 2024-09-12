[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / filterWithComplement

# Function: filterWithComplement()

```ts
function filterWithComplement<T, P>(array, predicate): T extends readonly infer R[] ? P extends (obj) => obj is infer A ? [A[], Exclude<R, A>[]] : [R[], R[]] : never
```

Returns the filtered array and the complement as well (elements
removed by the filter).

## Type Parameters

• **T** *extends* readonly `unknown`[]

• **P** *extends* (`x`) => `boolean`

## Parameters

• **array**: `T`

• **predicate**: `P`

## Returns

`T` *extends* readonly infer R[] ? `P` *extends* (`obj`) => `obj is infer A` ? [`A`[], `Exclude`\<`R`, `A`\>[]] : [`R`[], `R`[]] : `never`

## Defined in

[src/array/index.ts:119](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L119)
