**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / PascalCase

# Type alias: PascalCase\<S, Acc\>

> **PascalCase**\<`S`, `Acc`\>: `S` extends \`${infer First}${infer Rest}\` ? `Acc` extends `""` ? [`PascalCase`](PascalCase.md)\<`Rest`, `Uppercase`\<`First`\>\> : `First` extends `"_"` \| `" "` \| `"-"` ? [`PascalCase`](PascalCase.md)\<`Capitalize`\<`Rest`\>, `Acc`\> : [`PascalCase`](PascalCase.md)\<`Rest`, \`${Acc}${First}\`\> : `Acc`

Converts a string to PascalCase.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:596](https://github.com/umatch-oficial/utils/blob/ed8915b/src/string/index.ts#L596)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
