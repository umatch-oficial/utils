**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [math](../index.md) / hashNumber

# Function: hashNumber()

> **hashNumber**(`number`, `length`, `characters`?, `order`?): `string`

Returns a hash of the number with a fixed length using the given characters.

Hashes of consecutive numbers only differ by 1 character.

## Parameters

• **number**: `number`

• **length**: `number`

• **characters?**: `string`= `'abcdefghijklmnopqrstuvwxyz'`

Characters to use in the hash. Default: lowercase alphabet

• **order?**: `number`[]

An array of numbers from 0 to length-1 in any order. Default: [0,1,2,...]

## Returns

`string`

## Source

[src/math/index.ts:72](https://github.com/umatch-oficial/utils/blob/ed8915b/src/math/index.ts#L72)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
