[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / LastLetter

# Type Alias: LastLetter\<S, Previous\>

```ts
type LastLetter<S, Previous>: S extends `${infer First}${infer Rest}` ? Rest extends "" ? S : LastLetter<Rest, First> : Previous;
```

Returns the last letter of a string.

## Type Parameters

• **S** *extends* `string`

• **Previous** *extends* `string` = `""`

## Defined in

[src/string/index.ts:593](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L593)
