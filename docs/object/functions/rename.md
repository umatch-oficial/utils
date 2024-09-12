[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / rename

# Function: rename()

```ts
function rename<T, Mapper>(obj, mapper): Mapper extends Dictionary<string> ? { [K in Exclude<keyof T, ValueOf<Mapper>> as K extends keyof Mapper ? Mapper[K] : K]: T[K] } : {}
```

Returns a copy of an object, with renamed first-level keys.

## Type Parameters

• **T**

• **Mapper** *extends* \{ \[\_ in string \| number \| symbol\]?: string \} \| (`a`) => `string`

## Parameters

• **obj**: `T`

• **mapper**: `Mapper`

## Returns

`Mapper` *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)\<`string`\> ? `{ [K in Exclude<keyof T, ValueOf<Mapper>> as K extends keyof Mapper ? Mapper[K] : K]: T[K] }` : \{\}

## Defined in

[src/object/index.ts:354](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L354)
