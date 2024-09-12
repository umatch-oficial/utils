[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / Replace

# Type Alias: Replace\<S, Char, NewChar, Acc\>

```ts
type Replace<S, Char, NewChar, Acc>: S extends `${infer Before}${Char}${infer After}` ? Replace<After, Char, NewChar, `${Acc}${Before}${NewChar}`> : Acc extends "" ? S : `${Acc}${S}`;
```

Replaces NewChar with Char in S.

## Type Parameters

• **S** *extends* `string`

• **Char** *extends* `string`

• **NewChar** *extends* `string`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:18](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L18)
