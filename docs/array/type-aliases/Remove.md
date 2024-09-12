[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / Remove

# Type Alias: Remove\<T, X, Acc\>

```ts
type Remove<T, X, Acc>: T extends readonly [infer A, ...(infer B)] ? A extends X ? X extends A ? Remove<B, X, Acc> : Remove<B, X, [...Acc, A]> : Remove<B, X, [...Acc, A]> : Acc;
```

## Type Parameters

• **T** *extends* readonly `unknown`[]

• **X** *extends* `T`\[`number`\]

• **Acc** *extends* `unknown`[] = []

## Defined in

[src/array/index.ts:295](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L295)
