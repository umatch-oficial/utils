[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / apply

# Function: apply()

```ts
function apply<T, R, Keys>(
   obj, 
   func, 
   keys?): Keys extends undefined ? { [K in keyof T]: R } : { [K in keyof T]: K extends Keys[number] ? R : T[K] }
```

Copies an object and applies a function to all values. If keys is
specified, only applies the function to those keys.

## Type Parameters

• **T** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **R**

• **Keys** *extends* readonly keyof `T`[]

## Parameters

• **obj**: `T`

• **func**

• **keys?**: `Keys`

## Returns

`Keys` *extends* `undefined` ? `{ [K in keyof T]: R }` : `{ [K in keyof T]: K extends Keys[number] ? R : T[K] }`

## Defined in

[src/object/index.ts:21](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L21)
