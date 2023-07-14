[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > pick

# Function: pick()

> **pick**\<`T`, `K`\>(`obj`, `keys`): `Pick`\< `T`, `K` \>

Copies an object using some keys.

Makes a copy of an object using only the given keys. If an entry is
not present, it receives the value of undefined.

## Type parameters

| Parameter                                      |
| :--------------------------------------------- |
| `T`                                            |
| `K` _extends_ `string` \| `number` \| `symbol` |

## Parameters

| Parameter | Type             |
| :-------- | :--------------- |
| `obj`     | `T`              |
| `keys`    | _readonly_ `K`[] |

## Returns

`Pick`\< `T`, `K` \>

## Source

[src/object/index.ts:330](https://github.com/umatch-oficial/utils/blob/106c322/src/object/index.ts#L330)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
