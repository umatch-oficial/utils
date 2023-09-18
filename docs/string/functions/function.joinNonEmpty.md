[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > joinNonEmpty

# Function: joinNonEmpty()

> **joinNonEmpty**\<`T`, `Sep`\>(`array`, `separator`?): `JoinNonEmpty`\< `T`, `Sep` \>

Joins an array of primitives, filtering out nulls, undefineds and empty strings.

## Type parameters

| Parameter                                                                                  | Default |
| :----------------------------------------------------------------------------------------- | :------ |
| `T` _extends_ _readonly_ [`Primitive`](../../index/type-aliases/type-alias.Primitive.md)[] | -       |
| `Sep` _extends_ `string`                                                                   | `""`    |

## Parameters

| Parameter    | Type               |
| :----------- | :----------------- |
| `array`      | `undefined` \| `T` |
| `separator`? | `Sep`              |

## Returns

`JoinNonEmpty`\< `T`, `Sep` \>

## Source

[src/string/index.ts:312](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L312)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
