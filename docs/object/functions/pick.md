[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / pick

# Function: pick()

```ts
function pick<T, K>(obj, keys): Pick<T, K>
```

Copies an object using some keys.

Makes a copy of an object using only the given keys. If an entry is
not present, it receives the value of undefined.

## Type Parameters

• **T**

• **K** *extends* `string` \| `number` \| `symbol`

## Parameters

• **obj**: `T`

• **keys**: readonly `K`[]

## Returns

`Pick`\<`T`, `K`\>

## Defined in

[src/object/index.ts:345](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L345)
