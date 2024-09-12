[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / Equals

# Type Alias: Equals\<X, Y\>

```ts
type Equals<X, Y>: <T>() => T extends X ? 1 : 2 extends <T>() => T extends Y ? 1 : 2 ? true : false;
```

Asserts two types are equal.

## Type Parameters

• **X**

• **Y**

## Defined in

[src/index.ts:115](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L115)
