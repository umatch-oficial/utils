**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / diff

# Function: diff()

> **diff**\<`X`, `Y`\>(`a`, `b`): [`IsReadonly`](../../index/type-aliases/IsReadonly.md)\<`X`\> extends `true` ? [`IsReadonly`](../../index/type-aliases/IsReadonly.md)\<`Y`\> extends `true` ? [`Subtract`](../../index/type-aliases/Subtract.md)\<`X`, `Y`\> : `Y` : `X`

Returns a copy of the first array, without including elements
present in the second array.

## Type parameters

• **X** extends readonly (`string` \| `number`)[]

• **Y** extends readonly (`string` \| `number`)[]

## Parameters

• **a**: `X`

• **b**: `Y`

## Returns

[`IsReadonly`](../../index/type-aliases/IsReadonly.md)\<`X`\> extends `true` ? [`IsReadonly`](../../index/type-aliases/IsReadonly.md)\<`Y`\> extends `true` ? [`Subtract`](../../index/type-aliases/Subtract.md)\<`X`, `Y`\> : `Y` : `X`

## Source

[src/array/index.ts:57](https://github.com/umatch-oficial/utils/blob/4c813c4/src/array/index.ts#L57)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
