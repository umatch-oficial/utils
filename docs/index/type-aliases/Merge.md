[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / Merge

# Type Alias: Merge\<A, B\>

```ts
type Merge<A, B>: { [K in keyof A | keyof B]: K extends keyof B ? K extends keyof A ? A[K] extends Dictionary ? B[K] extends Dictionary ? Merge<A[K], B[K]> : B[K] : B[K] : B[K] : K extends keyof A ? A[K] : never };
```

Deep merges two dictionaries. Values from the right have higher priority.

## Type Parameters

• **A**

• **B**

## Defined in

[src/index.ts:79](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L79)
