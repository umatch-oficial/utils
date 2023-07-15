[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > split

# Function: split()

> **split**(
> `str`,
> `n`? = `-1`,
> `sep`? = `','`): `string`[]

Splits a string starting from the left, stops after n splits.
(equivalent of python's split)

## Example

```ts
// returns ["a", "b", "c"]
split('a,b,c');
// returns ["a", "b,c"]
split('a,b,c', 1);
```

## Parameters

| Parameter | Type                              | Default value | Description |
| :-------- | :-------------------------------- | :------------ | :---------- |
| `str`     | `undefined` \| `null` \| `string` | `undefined`   |             |
| `n`?      | `number`                          | `-1`          | -           |
| `sep`?    | `string`                          | `','`         | -           |

## Returns

`string`[]

## Source

[src/string/index.ts:499](https://github.com/umatch-oficial/utils/blob/a9008ad/src/string/index.ts#L499)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
