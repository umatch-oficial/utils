**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / TypeFromPath

# Type alias: TypeFromPath\<O, P\>

> **TypeFromPath**\<`O`, `P`\>: `P` extends \`${infer H}.${infer T}\` ? { [K in keyof O]: K extends string | number | bigint | boolean | null | undefined ? \`${K}\` extends H ? TypeFromPath<O[K], T> : never : never }\[keyof `O`\] : { [K in keyof O]: K extends string | number | bigint | boolean | null | undefined ? \`${K}\` extends P ? O[K] : never : never }\[keyof `O`\]

Takes an object and a path string that uses dot notation
and returns the type of the deep property at the path.

## Type parameters

• **O**

• **P** extends `string`

## Source

[src/index.ts:163](https://github.com/umatch-oficial/utils/blob/4c813c4/src/index.ts#L163)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
