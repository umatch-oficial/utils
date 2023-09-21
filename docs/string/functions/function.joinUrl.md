[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > joinUrl

# Function: joinUrl()

> **joinUrl**(...`parts`): `string`

Joins parts of a URL with '/'.

Removes / from the beginning and end of each part before joining.

## Example

```ts
// returns 'https://abc.com/example'
joinUrl('https://abc.com/', 'example/');
```

## Parameters

| Parameter  | Type                  |
| :--------- | :-------------------- |
| ...`parts` | _readonly_ `string`[] |

## Returns

`string`

## Source

[src/string/index.ts:333](https://github.com/umatch-oficial/utils/blob/a4be831/src/string/index.ts#L333)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
