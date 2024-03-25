**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [array](../index.md) / permutations

# Function: permutations()

> **permutations**\<`T`\>(`array`): `T` extends readonly infer R[] ? [`R`, `R`][] : `never`

Returns all length-2 tuples of the elements, in sorted order,
without repeated elements.<br>
(equivalent of python's itertools' combinations)

## Type parameters

• **T** extends readonly `unknown`[]

## Parameters

• **array**: `T`

## Returns

`T` extends readonly infer R[] ? [`R`, `R`][] : `never`

## Source

[src/array/index.ts:282](https://github.com/umatch-oficial/utils/blob/0b3210d/src/array/index.ts#L282)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
