[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / Trim

# Type Alias: Trim\<S\>

```ts
type Trim<S>: S extends ` ${infer After}` ? Trim<After> : S extends `${infer Before} ` ? Trim<Before> : S;
```

Trims both ends of a string.

## Type Parameters

• **S** *extends* `string`

## Defined in

[src/string/index.ts:31](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L31)
