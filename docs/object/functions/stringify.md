[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / stringify

# Function: stringify()

```ts
function stringify(obj, options?): string
```

Similar to JSON.stringify(), with some additional formatting options.

## Parameters

• **obj**: readonly `unknown`[] \| [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **options?**

• **options.doubleQuotes?**: `boolean`

Use double quotes. Default: true.

• **options.indentSize?**: `number`

Size of the indent. Default: 2.

• **options.length?**: `number`

Maximum length of a line. Default: the longest key +
primitive value pair in the object.

• **options.pad?**: `boolean`

Add padding between keys and values. Default:
false

• **options.wrap?**: `"chop"` \| `"chop if long"` \| `"wrap if long"`

Chop or wrap arrays. Chop means inserting a
line break between each element, while wrapping inserts line breaks only as necessary
to respect the length option. If the length is undefined, 'chop' is used. Default:
'chop if long'.

## Returns

`string`

## Defined in

[src/object/index.ts:452](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L452)
