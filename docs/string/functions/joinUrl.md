**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / joinUrl

# Function: joinUrl()

> **joinUrl**(...`parts`): `string`

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

## Source

[src/string/index.ts:333](https://github.com/umatch-oficial/utils/blob/6e00801/src/string/index.ts#L333)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
