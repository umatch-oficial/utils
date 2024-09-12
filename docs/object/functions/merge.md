[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / merge

# Function: merge()

```ts
function merge<A, B>(
   target, 
   source, 
strategy?): Merge<A, B>
```

Deep merges two objects.

Values from the second object override those in the first one,
except when both objects hold an array on the same key and the
strategy is set to "concat", in which case both arrays are merged.

## Type Parameters

• **A**

• **B** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md) \| `Partial`\<`A`\>

## Parameters

• **target**: `A`

• **source**: `B`

• **strategy?**: `"concat"` \| `"override"`

## Returns

[`Merge`](../../index/type-aliases/Merge.md)\<`A`, `B`\>

## Throws

if an unexpected strategy is provided.

## Defined in

[src/object/index.ts:310](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L310)
