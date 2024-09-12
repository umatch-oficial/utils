[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / Zip

# Type Alias: Zip\<T, Acc\>

```ts
type Zip<T, Acc>: T extends readonly [readonly infer A[], ...(infer B)] ? B extends readonly readonly unknown[][] ? Zip<B, Append<Acc, A>> : never : Acc[];
```

## Type Parameters

• **T** *extends* readonly readonly `unknown`[][]

• **Acc** *extends* readonly `unknown`[] = []

## Defined in

[src/array/index.ts:435](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L435)
