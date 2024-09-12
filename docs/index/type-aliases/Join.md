[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / Join

# Type Alias: Join\<L, R, Sep\>

```ts
type Join<L, R, Sep>: L extends string | number ? R extends string | number ? `${L}${Sep}${R}` : L : R extends string | number ? R : undefined;
```

Joins two strings or numbers unless either one is undefined.

## Type Parameters

• **L** *extends* `PropertyKey` \| `undefined` = `undefined`

• **R** *extends* `PropertyKey` \| `undefined` = `undefined`

• **Sep** *extends* `string` = `"."`

## Defined in

[src/index.ts:122](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L122)
