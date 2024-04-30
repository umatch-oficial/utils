**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / merge

# Function: merge()

> **merge**\<`A`, `B`\>(`target`, `source`, `strategy`?): [`Merge`](../../index/type-aliases/Merge.md)\<`A`, `B`\>

Deep merges two objects.

Values from the second object override those in the first one,
except when both objects hold an array on the same key and the
strategy is set to "concat", in which case both arrays are merged.

## Type parameters

• **A**

• **B** extends [`Dictionary`](../../index/type-aliases/Dictionary.md) \| `Partial`\<`A`\>

## Parameters

• **target**: `A`

• **source**: `B`

• **strategy?**: `"concat"` \| `"override"`

## Returns

[`Merge`](../../index/type-aliases/Merge.md)\<`A`, `B`\>

## Throws

if an unexpected strategy is provided.

## Source

[src/object/index.ts:310](https://github.com/umatch-oficial/utils/blob/ed8915b/src/object/index.ts#L310)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
