[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > merge

# Function: merge()

> **merge**\<`A`, `B`\>(
> `target`,
> `source`,
> `strategy`?): [`Merge`](../../index/type-aliases/type-alias.Merge.md)\< `A`, `B` \>

Deep merges two objects.

Values from the second object override those in the first one,
except when both objects hold an array on the same key and the
strategy is set to "concat", in which case both arrays are merged.

## Throws

if an unexpected strategy is provided.

## Type parameters

| Parameter                                                                                             |
| :---------------------------------------------------------------------------------------------------- |
| `A`                                                                                                   |
| `B` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) \| `Partial`\< `A` \> |

## Parameters

| Parameter   | Type                       |
| :---------- | :------------------------- |
| `target`    | `A`                        |
| `source`    | `B`                        |
| `strategy`? | `"concat"` \| `"override"` |

## Returns

[`Merge`](../../index/type-aliases/type-alias.Merge.md)\< `A`, `B` \>

## Source

[src/object/index.ts:312](https://github.com/umatch-oficial/utils/blob/618b1ef/src/object/index.ts#L312)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
