[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / CamelCase

# Type Alias: CamelCase\<S, Acc\>

```ts
type CamelCase<S, Acc>: S extends `${infer First}${infer Rest}` ? Acc extends "" ? CamelCase<Rest, Lowercase<First>> : First extends "_" | " " | "-" ? CamelCase<Capitalize<Rest>, Acc> : CamelCase<Rest, `${Acc}${First}`> : Acc;
```

Converts a string to camelCase.

## Type Parameters

• **S** *extends* `string`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:605](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L605)
