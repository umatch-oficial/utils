[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > getCountDown

# Function: getCountDown()

> **getCountDown**(`date`, `options`?): `string`

Returns a human-readable count-down until a certain date.

Starts from the largest unit of time (default: day) to the
smallest (default: minute). Returns the count-down in the
first unit for which the difference from date until now
exceeds the threshold for the unit (default: 1).

## Example

```ts
const date = DateTime.now().plus({ days: 3 });
// returns '3 days'
getCountDown(date);
// returns '3d'
getCountDown(date, { short: true });
// returns '72 hours'
getCountDown(date, {
  unitsThresholds: [
    ['day', 5],
    ['hour', 1],
  ],
});
```

## Throws

if the given dictionary doesn't have entries for all possible units.

## Parameters

| Parameter                  | Type                                                         | Description                                                                         |
| :------------------------- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `date`                     | `string` \| `DateTime`                                       | If date is a string, it is parsed with DateTime.fromISO(string, { setZone: true }). |
| `options`?                 | `object`                                                     |                                                                                     |
| `options.dictionary`?      | [`DateTimeDict`](../type-aliases/type-alias.DateTimeDict.md) | Words to substitute. Default: english words                                         |
| `options.pluralizer`?      | [`Pluralizer`](../type-aliases/type-alias.Pluralizer.md)     | A pluralizer function. Default: adds 's' to the end the word                        |
| `options.short`?           | `boolean`                                                    | Whether to shorten the duration identifier (pick first letter)                      |
| `options.unitsThresholds`? | _readonly_ _readonly_ [`DateTimeUnit`, `number`][]           | Threshold per unit                                                                  |

## Returns

`string`

## Source

[src/string/index.ts:231](https://github.com/umatch-oficial/utils/blob/a9008ad/src/string/index.ts#L231)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
