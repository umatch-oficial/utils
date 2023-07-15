[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > hasOwnProperty

# Function: hasOwnProperty()

> **hasOwnProperty**\<`X`, `Y`\>(`obj`, `prop`): `obj is X & Record<Y, unknown>`

Checks if a prop exists in obj and tells TypeScript that obj has this prop.

## Type parameters

| Parameter                   |
| :-------------------------- |
| `X` _extends_ \{}           |
| `Y` _extends_ `PropertyKey` |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `obj`     | `X`  |
| `prop`    | `Y`  |

## Returns

`obj is X & Record<Y, unknown>`

## Source

[src/object/index.ts:246](https://github.com/umatch-oficial/utils/blob/00cf87f/src/object/index.ts#L246)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
