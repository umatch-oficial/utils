[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / Union

# Type Alias: Union\<L, R\>

```ts
type Union<L, R>: L extends undefined ? R extends undefined ? undefined : R : R extends undefined ? L : L | R;
```

Makes a Union between two types removing undefined.

## Type Parameters

• **L**

• **R**

## Defined in

[src/index.ts:136](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L136)
