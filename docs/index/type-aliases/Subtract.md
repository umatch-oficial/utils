[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / Subtract

# Type Alias: Subtract\<A, B, Acc\>

```ts
type Subtract<A, B, Acc>: A extends readonly [infer H, ...(infer T)] ? H extends B[number] ? Subtract<T, B, Acc> : Subtract<T, B, readonly [...Acc, H]> : Acc;
```

Excludes types present in B from A.

## Type Parameters

• **A** *extends* readonly `unknown`[]

• **B** *extends* readonly `unknown`[]

• **Acc** *extends* readonly `unknown`[] = []

## Defined in

[src/index.ts:95](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L95)
