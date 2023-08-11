[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > setDeepProperty

# Function: setDeepProperty()

> **setDeepProperty**(
> `obj`,
> `str`,
> `value`,
> `sep` = `'.'`): `unknown`

Sets a deep property of an object given a path-like string.

## Example

```ts
// returns { a: { b: [2,3,5] } }
setDeepProperty({ a: { b: [2, 3, 9] } }, 'a.b[2]', 5);
```

## Throws

if some object in the path is an array, but the next key is not a number.

## Parameters

| Parameter | Type                                                                                        | Default value |
| :-------- | :------------------------------------------------------------------------------------------ | :------------ |
| `obj`     | _readonly_ `unknown`[] \| [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) | `undefined`   |
| `str`     | `string`                                                                                    | `undefined`   |
| `value`   | `unknown`                                                                                   | `undefined`   |
| `sep`     | `string`                                                                                    | `'.'`         |

## Returns

`unknown`

## Source

[src/object/index.ts:387](https://github.com/umatch-oficial/utils/blob/51f6213/src/object/index.ts#L387)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
