[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / Uniques

# Type Alias: Uniques\<T, Acc\>

```ts
type Uniques<T, Acc>: T extends readonly [infer A, ...(infer B)] ? A extends Acc[number] ? Uniques<B, Acc> : Uniques<B, [...Acc, A]> : Acc;
```

## Type Parameters

• **T** *extends* readonly `unknown`[]

• **Acc** *extends* `unknown`[] = []

## Defined in

[src/array/index.ts:413](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L413)
