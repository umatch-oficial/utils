**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / NestedPaths

# Type alias: NestedPaths\<T, Base, Prev\>

> **NestedPaths**\<`T`, `Base`, `Prev`\>: `T` extends [`Dictionary`](Dictionary.md) ? [`ValueOf`](ValueOf.md)\<`{ [K in keyof T]: T[K] extends Dictionary ? NestedPaths<T[K], Union<Base, Prev>, Join<Prev, K>> : Union<Base, Union<Prev, Join<Prev, K>>> }`\> : `string`

Takes an object and returns a union of all the deep paths
to properties in it, using dot notation.

## Type parameters

• **T**

• **Base** extends `PropertyKey` \| `undefined` = `undefined`

• **Prev** extends `PropertyKey` \| `undefined` = `undefined`

## Source

[src/index.ts:148](https://github.com/umatch-oficial/utils/blob/1813ff9/src/index.ts#L148)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
