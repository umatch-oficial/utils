**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / getCountDown

# Function: getCountDown()

> **getCountDown**(`date`, `options`?): `string`

Returns a human-readable count-down until a certain date.

Starts from the largest unit of time (default: day) to the
smallest (default: minute). Returns the count-down in the
first unit for which the difference from date until now
exceeds the threshold for the unit (default: 1).

## Parameters

• **date**: `string` \| `DateTime`\<`boolean`\>

If date is a string, it is parsed with DateTime.fromISO(string, { setZone: true }).

• **options?**: `Object`

• **options\.dictionary?**: [`DateTimeDict`](../type-aliases/DateTimeDict.md)

Words to substitute. Default: english words

• **options\.pluralizer?**: [`ToPlural`](../type-aliases/ToPlural.md)

A pluralizer function. Default: adds 's' to the end the word

• **options\.short?**: `boolean`

Whether to shorten the duration identifier (pick first letter)

• **options\.unitsThresholds?**: readonly readonly [`DateTimeUnit`, `number`][]

Threshold per unit

## Returns

`string`

## Example

```ts
const date = DateTime.now().plus({ days: 3 });
// returns '3 days'
getCountDown(date);
// returns '3d'
getCountDown(date, { short: true });
// returns '72 hours'
getCountDown(date, { unitsThresholds: [['day', 5], ['hour', 1]] });
```

## Throws

if the given dictionary doesn't have entries for all possible units.

## Source

[src/string/index.ts:253](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L253)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
