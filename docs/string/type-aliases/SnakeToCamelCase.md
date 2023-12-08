**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / SnakeToCamelCase

# Type alias: SnakeToCamelCase\<S, Acc\>

> **SnakeToCamelCase**\<`S`, `Acc`\>: `S` extends \`${infer H}_${infer T}\` ? [`SnakeToCamelCase`](SnakeToCamelCase.md)\<`Capitalize`\<`T`\>, \`${Acc}${H}\`\> : `S` extends \`${infer H}${infer T}\` ? [`SnakeToCamelCase`](SnakeToCamelCase.md)\<`T`, \`${Acc}${H}\`\> : `Acc`

Converts a string from snake to camel case.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:573](https://github.com/umatch-oficial/utils/blob/c1935bc/src/string/index.ts#L573)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
