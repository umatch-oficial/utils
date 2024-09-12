[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / TitleCase

# Type Alias: TitleCase\<S, Acc\>

```ts
type TitleCase<S, Acc>: S extends `${infer First}${infer Rest}` ? Acc extends "" ? TitleCase<Rest, Uppercase<First>> : First extends "_" | " " | "-" ? TitleCase<Capitalize<Rest>, `${Acc} `> : First extends Uppercase<First> ? LastLetter<Acc> extends " " ? TitleCase<Rest, `${Acc}${First}`> : TitleCase<Rest, `${Acc} ${First}`> : TitleCase<Rest, `${Acc}${First}`> : Acc;
```

Converts a string to Title Case.

## Type Parameters

• **S** *extends* `string`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:669](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L669)
