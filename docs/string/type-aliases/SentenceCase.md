**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / SentenceCase

# Type alias: SentenceCase\<S, Acc\>

> **SentenceCase**\<`S`, `Acc`\>: `S` extends \`${infer First}${infer Rest}\` ? `Acc` extends `""` ? [`SentenceCase`](SentenceCase.md)\<`Rest`, `Uppercase`\<`First`\>\> : `First` extends `"_"` \| `" "` \| `"-"` ? [`SentenceCase`](SentenceCase.md)\<`Rest`, \`${Acc} \`\> : `First` extends `Uppercase`\<`First`\> ? [`LastLetter`](LastLetter.md)\<`Acc`\> extends `" "` ? [`SentenceCase`](SentenceCase.md)\<`Rest`, \`${Acc}${Lowercase<First>}\`\> : [`SentenceCase`](SentenceCase.md)\<`Rest`, \`${Acc} ${Lowercase<First>}\`\> : [`SentenceCase`](SentenceCase.md)\<`Rest`, \`${Acc}${First}\`\> : `Acc`

Converts a string to Sentence case.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:633](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L633)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
