[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [array](../README.md) / Append

# Type Alias: Append\<T, Element\>

```ts
type Append<T, Element>: IsReadonly<T> extends true ? readonly [...T, Element] : [...T, Element];
```

## Type Parameters

• **T** *extends* readonly `unknown`[]

• **Element**

## Defined in

[src/array/index.ts:432](https://github.com/umatch-oficial/utils/blob/main/src/array/index.ts#L432)
