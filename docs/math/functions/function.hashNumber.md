[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [math](../README.md) > hashNumber

# Function: hashNumber()

> **hashNumber**(
> `number`,
> `length`,
> `characters`? = `'abcdefghijklmnopqrstuvwxyz'`,
> `order`?): `string`

Returns a hash of the number with a fixed length using the given characters.

Hashes of consecutive numbers only differ by 1 character.

## Parameters

| Parameter     | Type       | Default value                  | Description                                                               |
| :------------ | :--------- | :----------------------------- | :------------------------------------------------------------------------ |
| `number`      | `number`   | `undefined`                    |                                                                           |
| `length`      | `number`   | `undefined`                    |                                                                           |
| `characters`? | `string`   | `'abcdefghijklmnopqrstuvwxyz'` | Characters to use in the hash. Default: lowercase alphabet                |
| `order`?      | `number`[] | `undefined`                    | An array of numbers from 0 to length-1 in any order. Default: [0,1,2,...] |

## Returns

`string`

## Source

[src/math/index.ts:55](https://github.com/umatch-oficial/utils/blob/a4be831/src/math/index.ts#L55)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
