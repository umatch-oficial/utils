[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / SentenceCase

# Type Alias: SentenceCase\<S, Acc\>

```ts
type SentenceCase<S, Acc>: S extends `${infer First}${infer Rest}` ? Acc extends "" ? SentenceCase<Rest, Uppercase<First>> : First extends "_" | " " | "-" ? SentenceCase<Rest, `${Acc} `> : First extends Uppercase<First> ? LastLetter<Acc> extends " " ? SentenceCase<Rest, `${Acc}${Lowercase<First>}`> : SentenceCase<Rest, `${Acc} ${Lowercase<First>}`> : SentenceCase<Rest, `${Acc}${First}`> : Acc;
```

Converts a string to Sentence case.

## Type Parameters

• **S** *extends* `string`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:635](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L635)
