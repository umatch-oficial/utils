[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / IsReadonly

# Type Alias: IsReadonly\<T\>

```ts
type IsReadonly<T>: T extends unknown[] ? false : true;
```

Returns whether an array is readonly.

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Defined in

[src/index.ts:12](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L12)
