[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / Cartesian

# Type Alias: Cartesian\<Arrays, Acc\>

```ts
type Cartesian<Arrays, Acc>: Arrays extends readonly [readonly infer H[], ...(infer T)] ? Cartesian<T, [...Acc, H]> : Acc[];
```

## Type Parameters

• **Arrays** *extends* readonly `unknown`[]

• **Acc** *extends* `unknown`[] = []

## Defined in

[src/array/index.ts:16](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L16)
