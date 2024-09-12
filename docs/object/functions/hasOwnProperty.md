[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / hasOwnProperty

# Function: hasOwnProperty()

```ts
function hasOwnProperty<X, Y>(obj, prop): obj is X & Record<Y, unknown>
```

Checks if a prop exists in obj and tells TypeScript that obj has this prop.

## Type Parameters

• **X**

• **Y** *extends* `PropertyKey`

## Parameters

• **obj**: `X`

• **prop**: `Y`

## Returns

`obj is X & Record<Y, unknown>`

## Defined in

[src/object/index.ts:249](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L249)
