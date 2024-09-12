[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / TransformValuesByKey

# Type Alias: TransformValuesByKey\<T, A, B\>

```ts
type TransformValuesByKey<T, A, B>: { [K in keyof T]: K extends A ? T[K] extends undefined ? B | undefined : B : T[K] };
```

Changes the type of value to B for keys in A

## Type Parameters

• **T**

• **A** *extends* keyof `T`

• **B**

## Defined in

[src/index.ts:50](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L50)
