[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / SnakeCase

# Type Alias: SnakeCase\<S, Acc\>

```ts
type SnakeCase<S, Acc>: S extends `${infer First}${infer Rest}` ? Acc extends "" ? SnakeCase<Rest, Lowercase<First>> : First extends "_" | " " | "-" ? SnakeCase<Capitalize<Rest>, `${Acc}_`> : First extends Uppercase<First> ? LastLetter<Acc> extends "_" ? SnakeCase<Rest, `${Acc}${Lowercase<First>}`> : SnakeCase<Rest, `${Acc}_${Lowercase<First>}`> : SnakeCase<Rest, `${Acc}${First}`> : Acc;
```

Converts a string to snake_case.

## Type Parameters

• **S** *extends* `string`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:653](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L653)
