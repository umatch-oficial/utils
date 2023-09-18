[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > basicPluralizer

# Function: basicPluralizer()

> **basicPluralizer**(
> `word`,
> `quantity`?,
> `plural`?): `string`

Pluralizes the word if _quantity_ is undefined, 0 or
greater than 1. Uses the given plural or adds an 's' to the end.

## Example

```ts
// returns 'developers'
basicPluralizer('developer');
// returns 'developer'
basicPluralizer('developer', 1);
// returns 'developers'
basicPluralizer('developer', 2);
```

## Parameters

| Parameter   | Type     |
| :---------- | :------- |
| `word`      | `string` |
| `quantity`? | `number` |
| `plural`?   | `string` |

## Returns

`string`

## Source

[src/string/index.ts:62](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L62)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
