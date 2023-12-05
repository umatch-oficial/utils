[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > getDeepProperty

# Function: getDeepProperty()

> **getDeepProperty**(
> `obj`,
> `str`,
> `sep` = `'.'`): `unknown`

Returns a deep property of an object given a path-like string.

## Example

```ts
// returns 9
getDeepProperty({ a: { b: [2, 3, 9] } }, 'a.b[2]');
```

## Parameters

| Parameter | Type                                                                                        | Default value |
| :-------- | :------------------------------------------------------------------------------------------ | :------------ |
| `obj`     | _readonly_ `unknown`[] \| [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) | `undefined`   |
| `str`     | `string`                                                                                    | `undefined`   |
| `sep`     | `string`                                                                                    | `'.'`         |

## Returns

`unknown`

## Source

[src/object/index.ts:232](https://github.com/umatch-oficial/utils/blob/fe3e40a/src/object/index.ts#L232)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
