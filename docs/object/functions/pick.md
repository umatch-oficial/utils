**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / pick

# Function: pick()

> **pick**\<`T`, `K`\>(`obj`, `keys`): `Pick`\<`T`, `K`\>

Copies an object using some keys.

Makes a copy of an object using only the given keys. If an entry is
not present, it receives the value of undefined.

## Type parameters

• **T**

• **K** extends `string` \| `number` \| `symbol`

## Parameters

• **obj**: `T`

• **keys**: readonly `K`[]

## Returns

`Pick`\<`T`, `K`\>

## Source

[src/object/index.ts:345](https://github.com/umatch-oficial/utils/blob/6b2757d/src/object/index.ts#L345)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
