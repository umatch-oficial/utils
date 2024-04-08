**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / CamelCase

# Type alias: CamelCase\<S, Acc\>

> **CamelCase**\<`S`, `Acc`\>: `S` extends \`${infer First}${infer Rest}\` ? `Acc` extends `""` ? [`CamelCase`](CamelCase.md)\<`Rest`, `Lowercase`\<`First`\>\> : `First` extends `"_"` \| `" "` \| `"-"` ? [`CamelCase`](CamelCase.md)\<`Capitalize`\<`Rest`\>, `Acc`\> : [`CamelCase`](CamelCase.md)\<`Rest`, \`${Acc}${First}\`\> : `Acc`

Converts a string to camelCase.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:583](https://github.com/umatch-oficial/utils/blob/4c813c4/src/string/index.ts#L583)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
