**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / formatTime

# Function: formatTime()

> **formatTime**(`time`, `options`?): `string`

Formats the duration-like object, using up to the specified number
of parts starting from the largest non-zero unit. Values are
converted into larger units, so that 70 seconds becomes 1 minute
and 10 seconds, for example.

## Parameters

• **time**: `Object`

Duration-like object

• **time\.hours?**: `number`

• **time\.milliseconds?**: `number`

• **time\.minutes?**: `number`

• **time\.seconds?**: `number`

• **options?**: `Object`

• **options\.dictionary?**: `Object`

Words to substitute. Default: english words

• **options\.dictionary\.and?**: `string`

• **options\.dictionary\.hour?**: `string`

• **options\.dictionary\.millisecond?**: `string`

• **options\.dictionary\.minute?**: `string`

• **options\.dictionary\.second?**: `string`

• **options\.parts?**: `number`

The number of parts to include in the output. Default: 2

• **options\.pluralizer?**: [`Pluralizer`](../type-aliases/Pluralizer.md)

A pluralizer function. Default: adds 's' to the end the word

• **options\.short?**: `boolean`

## Returns

`string`

## Example

```ts
// returns "10 minutes and 5 seconds"
formatTime(
    { hours: 0, minutes: 10, seconds: 5, milliseconds: 300 },
    { parts: 2 },
)
```

## Source

[src/string/index.ts:131](https://github.com/umatch-oficial/utils/blob/c1935bc/src/string/index.ts#L131)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
