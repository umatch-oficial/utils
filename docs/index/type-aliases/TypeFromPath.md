**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / TypeFromPath

# Type alias: TypeFromPath\<O, P\>

> **TypeFromPath**\<`O`, `P`\>: `P` extends `string` ? `O` extends [`Dictionary`](Dictionary.md) ? `P` extends keyof `O` ? `O`\[`P`\] : `P` extends \`${infer H}.${infer T}\` ? `H` extends keyof `O` ? [`TypeFromPath`](TypeFromPath.md)\<`O`\[`H`\], `T`\> : `never` : `never` : `never` : `unknown`

Takes an object and a path string that uses dot notation
and returns the type of the deep property at the path.

## Type parameters

• **O**

• **P** extends `string`

## Source

[src/index.ts:163](https://github.com/umatch-oficial/utils/blob/7369e19/src/index.ts#L163)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
