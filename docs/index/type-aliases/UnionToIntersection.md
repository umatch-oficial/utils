[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / UnionToIntersection

# Type Alias: UnionToIntersection\<T\>

```ts
type UnionToIntersection<T>: T extends never ? never : (arg) => void extends (arg) => void ? I : never;
```

## Type Parameters

• **T**

## Defined in

[src/index.ts:173](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L173)
