[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [index](../README.md) / TypeFromPath

# Type Alias: TypeFromPath\<O, P\>

```ts
type TypeFromPath<O, P>: P extends `${infer H}.${infer T}` ? TypeFromPath<O[H & keyof O], T> : O[P & keyof O];
```

Takes an object and a path string that uses dot notation
and returns the type of the deep property at the path.

The object must only contain string keys.

## Type Parameters

• **O**

• **P** *extends* `string`

## Defined in

[src/index.ts:165](https://github.com/umatch-oficial/utils/blob/main/src/index.ts#L165)
