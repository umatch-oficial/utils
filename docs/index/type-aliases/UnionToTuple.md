[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / UnionToTuple

# Type Alias: UnionToTuple\<T, Acc\>

```ts
type UnionToTuple<T, Acc>: UnionToIntersection<T extends never ? never : (arg) => T> extends (_) => infer W ? UnionToTuple<Exclude<T, W>, [W, ...Acc]> : Acc;
```

## Type Parameters

• **T**

• **Acc** *extends* `unknown`[] = []

## Defined in

[src/index.ts:177](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L177)
