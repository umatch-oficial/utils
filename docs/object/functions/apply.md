**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / apply

# Function: apply()

> **apply**\<`T`, `R`, `Keys`\>(`obj`, `func`, `keys`?): `Keys` extends `undefined` ? `{ [K in keyof T]: R }` : `{ [K in keyof T]: K extends Keys[number] ? R : T[K] }`

Copies an object and applies a function to all values. If keys is
specified, only applies the function to those keys.

## Type parameters

• **T** extends [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **R**

• **Keys** extends readonly keyof `T`[]

## Parameters

• **obj**: `T`

• **func**: (`val`) => `R`

• **keys?**: `Keys`

## Returns

`Keys` extends `undefined` ? `{ [K in keyof T]: R }` : `{ [K in keyof T]: K extends Keys[number] ? R : T[K] }`

## Source

[src/object/index.ts:24](https://github.com/umatch-oficial/utils/blob/c6d91fc/src/object/index.ts#L24)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
