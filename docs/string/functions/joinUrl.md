[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / joinUrl

# Function: joinUrl()

```ts
function joinUrl(...parts): string
```

Joins parts of a URL with '/'.

Removes / from the beginning and end of each part before joining.

## Parameters

• ...**parts**: readonly `string`[]

## Returns

`string`

## Example

```ts
// returns 'https://abc.com/example'
joinUrl('https://abc.com/', 'example/')
```

## Defined in

[src/string/index.ts:357](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L357)
