[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / DeepEmpty

# Type Alias: DeepEmpty

```ts
type DeepEmpty: {};
```

A deep empty object only has values that are empty strings, empty
arrays, empty objects or deep empty objects.

## Index Signature

 \[`key`: `PropertyKey`\]: `""` \| readonly [] \| `Record`\<`PropertyKey`, `never`\> \| [`DeepEmpty`](DeepEmpty.md)

## Defined in

[src/object/index.ts:261](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L261)
