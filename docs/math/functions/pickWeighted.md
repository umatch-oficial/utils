[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [math](../README.md) / pickWeighted

# Function: pickWeighted()

```ts
function pickWeighted<T>(options): T["option"]
```

Picks a random option from an array of { option, weight }.

## Type Parameters

• **T** *extends* \{
  `option`: `unknown`;
  `weight`: `number`;
 \}

## Parameters

• **options**: readonly `T`[]

## Returns

`T`\[`"option"`\]

## Defined in

[src/math/index.ts:197](https://github.com/umatch-oficial/utils/blob/main/src/math/index.ts#L197)
