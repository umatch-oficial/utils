[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > formatTime

# Function: formatTime()

> **formatTime**(`time`, `options`?): `string`

Formats the duration-like object, using up to the specified number
of parts starting from the largest non-zero unit. Values are
converted into larger units, so that 70 seconds becomes 1 minute
and 10 seconds, for example.

## Example

```ts
// returns "10 minutes and 5 seconds"
formatTime({ hours: 0, minutes: 10, seconds: 5, milliseconds: 300 }, { parts: 2 });
```

## Parameters

| Parameter                         | Type                                                     | Description                                                  |
| :-------------------------------- | :------------------------------------------------------- | :----------------------------------------------------------- |
| `time`                            | `object`                                                 | Duration-like object                                         |
| `time.hours`?                     | `number`                                                 | -                                                            |
| `time.milliseconds`?              | `number`                                                 | -                                                            |
| `time.minutes`?                   | `number`                                                 | -                                                            |
| `time.seconds`?                   | `number`                                                 | -                                                            |
| `options`?                        | `object`                                                 |                                                              |
| `options.dictionary`?             | `object`                                                 | Words to substitute. Default: english words                  |
| `options.dictionary.and`?         | `string`                                                 | -                                                            |
| `options.dictionary.hour`?        | `string`                                                 | -                                                            |
| `options.dictionary.millisecond`? | `string`                                                 | -                                                            |
| `options.dictionary.minute`?      | `string`                                                 | -                                                            |
| `options.dictionary.second`?      | `string`                                                 | -                                                            |
| `options.parts`?                  | `number`                                                 | The number of parts to include in the output. Default: 2     |
| `options.pluralizer`?             | [`Pluralizer`](../type-aliases/type-alias.Pluralizer.md) | A pluralizer function. Default: adds 's' to the end the word |
| `options.short`?                  | `boolean`                                                | -                                                            |

## Returns

`string`

## Source

[src/string/index.ts:131](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L131)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
