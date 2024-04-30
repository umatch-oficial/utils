**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / TitleCase

# Type alias: TitleCase\<S, Acc\>

> **TitleCase**\<`S`, `Acc`\>: `S` extends \`${infer First}${infer Rest}\` ? `Acc` extends `""` ? [`TitleCase`](TitleCase.md)\<`Rest`, `Uppercase`\<`First`\>\> : `First` extends `"_"` \| `" "` \| `"-"` ? [`TitleCase`](TitleCase.md)\<`Capitalize`\<`Rest`\>, \`${Acc} \`\> : `First` extends `Uppercase`\<`First`\> ? [`LastLetter`](LastLetter.md)\<`Acc`\> extends `" "` ? [`TitleCase`](TitleCase.md)\<`Rest`, \`${Acc}${First}\`\> : [`TitleCase`](TitleCase.md)\<`Rest`, \`${Acc} ${First}\`\> : [`TitleCase`](TitleCase.md)\<`Rest`, \`${Acc}${First}\`\> : `Acc`

Converts a string to Title Case.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:646](https://github.com/umatch-oficial/utils/blob/ed8915b/src/string/index.ts#L646)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
