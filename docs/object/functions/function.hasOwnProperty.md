[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > hasOwnProperty

# Function: hasOwnProperty()

> **hasOwnProperty**\<`X`, `Y`\>(`obj`, `prop`): `obj is X & Record<Y, unknown>`

Checks if a prop exists in obj and tells TypeScript that obj has this prop.

## Type parameters

| Parameter                   |
| :-------------------------- |
| `X`                         |
| `Y` _extends_ `PropertyKey` |

## Parameters

| Parameter | Type |
| :-------- | :--- |
| `obj`     | `X`  |
| `prop`    | `Y`  |

## Returns

`obj is X & Record<Y, unknown>`

## Source

[src/object/index.ts:252](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/object/index.ts#L252)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
