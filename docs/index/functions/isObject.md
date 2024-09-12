[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / isObject

# Function: isObject()

```ts
function isObject(obj): obj is Dictionary<unknown>
```

Returns whether obj is NOT one of the primitive data types. It may
still be any kind of object, including the instance of some class.
To narrow this down to only plain objects, use [isPlainObject][isPlainObject](isPlainObject.md).

## Parameters

• **obj**: `unknown`

## Returns

`obj is Dictionary<unknown>`

## Defined in

[src/index.ts:257](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L257)
