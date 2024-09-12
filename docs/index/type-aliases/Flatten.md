[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / Flatten

# Type Alias: Flatten\<Y, Acc\>

```ts
type Flatten<Y, Acc>: Y extends readonly [infer H, ...(infer T)] ? H extends readonly unknown[] ? Flatten<T, readonly [...Acc, H[number]]> : Flatten<T, readonly [...Acc, H]> : Acc;
```

Flattens a tuple.

## Type Parameters

• **Y** *extends* readonly `unknown`[]

• **Acc** *extends* readonly `unknown`[] = []

## Defined in

[src/index.ts:39](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L39)
