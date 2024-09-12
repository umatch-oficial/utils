[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / joinNonEmpty

# Function: joinNonEmpty()

```ts
function joinNonEmpty<T, Sep>(array, separator?): JoinNonEmpty<T, Sep>
```

Joins an array of primitives, filtering out nulls, undefineds and empty strings.

## Type Parameters

• **T** *extends* readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **Sep** *extends* `string` = `""`

## Parameters

• **array**: `undefined` \| `T`

• **separator?**: `Sep`

## Returns

[`JoinNonEmpty`](../type-aliases/JoinNonEmpty.md)\<`T`, `Sep`\>

## Defined in

[src/string/index.ts:336](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L336)
