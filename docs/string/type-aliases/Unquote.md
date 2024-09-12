[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / Unquote

# Type Alias: Unquote\<S, Quote\>

```ts
type Unquote<S, Quote>: "'" extends Quote ? S extends `'${infer Middle}'` ? Middle : "\"" extends Quote ? S extends `"${infer Middle}"` ? Middle : S : S : S extends `"${infer Middle}"` ? Middle : S;
```

Removes quotes from the start and end of a string.

## Type Parameters

• **S** *extends* `string`

• **Quote** *extends* `"'"` \| "\"" = `"'"` \| "\""

## Defined in

[src/string/index.ts:39](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L39)
