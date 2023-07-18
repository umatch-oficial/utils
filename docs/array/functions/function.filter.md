[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [array](../README.md) > filter

# Function: filter()

> **filter**\<`T`\>(
> `array`,
> `callback`,
> `concurrency` = `50`): `Promise`\< `T`[`number`][] \>

Same as Array.filter, but accepts async callbacks.

Uses bluebird.map to limit concurrency.

## Type parameters

| Parameter                            |
| :----------------------------------- |
| `T` _extends_ _readonly_ `unknown`[] |

## Parameters

| Parameter     | Type                              | Default value |
| :------------ | :-------------------------------- | :------------ |
| `array`       | `T`                               | `undefined`   |
| `callback`    | (`x`) => `Promise`\< `boolean` \> | `undefined`   |
| `concurrency` | `number`                          | `50`          |

## Returns

`Promise`\< `T`[`number`][] \>

## Source

[src/array/index.ts:83](https://github.com/umatch-oficial/utils/blob/618b1ef/src/array/index.ts#L83)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
