**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / rename

# Function: rename()

> **rename**\<`T`, `Mapper`\>(`obj`, `mapper`): `Mapper` extends [`Dictionary`](../../index/type-aliases/Dictionary.md)\<`string`\> ? `{ [K in Exclude<keyof T, ValueOf<Mapper>> as K extends keyof Mapper ? Mapper[K] : K]: T[K] }` : `Object`

Returns a copy of an object, with renamed first-level keys.

## Type parameters

• **T**

• **Mapper** extends `{ [_ in string | number | symbol]?: string }` \| (`a`) => `string`

## Parameters

• **obj**: `T`

• **mapper**: `Mapper`

## Returns

`Mapper` extends [`Dictionary`](../../index/type-aliases/Dictionary.md)\<`string`\> ? `{ [K in Exclude<keyof T, ValueOf<Mapper>> as K extends keyof Mapper ? Mapper[K] : K]: T[K] }` : `Object`

## Source

[src/object/index.ts:354](https://github.com/umatch-oficial/utils/blob/ed8915b/src/object/index.ts#L354)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
