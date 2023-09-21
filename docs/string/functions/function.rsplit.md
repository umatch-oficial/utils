[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > rsplit

# Function: rsplit()

> **rsplit**(
> `str`,
> `n`? = `-1`,
> `sep`? = `','`): `string`[]

Splits a string starting from the right, stops after n splits.
(equivalent of python's rsplit)

## Example

```ts
// returns ["a", "b", "c"]
rsplit('a,b,c');
// returns ["a,b", "c"]
rsplit('a,b,c', 1);
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

[src/string/index.ts:479](https://github.com/umatch-oficial/utils/blob/a4be831/src/string/index.ts#L479)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
