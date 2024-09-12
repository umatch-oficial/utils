[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / PascalCase

# Type Alias: PascalCase\<S, Acc\>

```ts
type PascalCase<S, Acc>: S extends `${infer First}${infer Rest}` ? Acc extends "" ? PascalCase<Rest, Uppercase<First>> : First extends "_" | " " | "-" ? PascalCase<Capitalize<Rest>, Acc> : PascalCase<Rest, `${Acc}${First}`> : Acc;
```

Converts a string to PascalCase.

## Type Parameters

• **S** *extends* `string`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:621](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L621)
