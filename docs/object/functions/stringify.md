**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / stringify

# Function: stringify()

> **stringify**(`obj`, `options`?, `inheritedIndent`?): `string`

Similar to JSON.stringify(), but optionally pads entries between
the key and value to make all lines have the same width.

## Parameters

• **obj**: readonly `unknown`[] \| [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **options?**: `Object`

• **options\.doubleQuotes?**: `boolean`

Use double quotes. Default: true

• **options\.indent?**: `number`

The size of the indent. Default: 2

• **options\.pad?**: `boolean`

Whether to pad entries. Default: false

• **inheritedIndent?**: `string`= `''`

Used to keep track of the current indent during recursion

## Returns

`string`

## Source

[src/object/index.ts:466](https://github.com/umatch-oficial/utils/blob/7d512db/src/object/index.ts#L466)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
