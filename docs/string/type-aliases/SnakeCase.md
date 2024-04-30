**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / SnakeCase

# Type alias: SnakeCase\<S, Acc\>

> **SnakeCase**\<`S`, `Acc`\>: `S` extends \`${infer First}${infer Rest}\` ? `Acc` extends `""` ? [`SnakeCase`](SnakeCase.md)\<`Rest`, `Lowercase`\<`First`\>\> : `First` extends `"_"` \| `" "` \| `"-"` ? [`SnakeCase`](SnakeCase.md)\<`Capitalize`\<`Rest`\>, \`${Acc}_\`\> : `First` extends `Uppercase`\<`First`\> ? [`LastLetter`](LastLetter.md)\<`Acc`\> extends `"_"` ? [`SnakeCase`](SnakeCase.md)\<`Rest`, \`${Acc}${Lowercase<First>}\`\> : [`SnakeCase`](SnakeCase.md)\<`Rest`, \`${Acc}_${Lowercase<First>}\`\> : [`SnakeCase`](SnakeCase.md)\<`Rest`, \`${Acc}${First}\`\> : `Acc`

Converts a string to snake_case.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:628](https://github.com/umatch-oficial/utils/blob/ed8915b/src/string/index.ts#L628)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
