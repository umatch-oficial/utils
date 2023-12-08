**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / hasSameElements

# Function: hasSameElements()

> **hasSameElements**\<`X`, `A`, `B`\>(`a`, `b`): [`Equals`](../../index/type-aliases/Equals.md)\<`A`\[`number`\], `B`\[`number`\]\> extends `true` ? `A` extends `Object` ? `B` extends `Object` ? [`Equals`](../../index/type-aliases/Equals.md)\<`ALen`, `BLen`\> extends `true` ? `true` : `false` : `false` : `false` : `false`

Returns whether 2 arrays have the same elements, regardless of order.

## Type parameters

• **X** extends `string` \| `number`

• **A** extends readonly `X`[]

• **B** extends readonly `X`[]

## Parameters

• **a**: `A`

• **b**: `B`

## Returns

[`Equals`](../../index/type-aliases/Equals.md)\<`A`\[`number`\], `B`\[`number`\]\> extends `true` ? `A` extends `Object` ? `B` extends `Object` ? [`Equals`](../../index/type-aliases/Equals.md)\<`ALen`, `BLen`\> extends `true` ? `true` : `false` : `false` : `false` : `false`

## Source

[src/array/index.ts:230](https://github.com/umatch-oficial/utils/blob/c1935bc/src/array/index.ts#L230)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)