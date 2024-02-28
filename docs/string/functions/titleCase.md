**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / titleCase

# Function: titleCase()

> **titleCase**\<`S`\>(`str`, `skipWords`?): [`TitleCase`](../type-aliases/TitleCase.md)\<`S`\>

Converts a string to Title Case.

Some words should not be capitalized, depending on the language.

## Type parameters

• **S** extends `string`

## Parameters

• **str**: `S`

• **skipWords?**: readonly `string`[]= `ENGLISH_SKIP_WORDS`

Words to skip. Default: english skip words (articles, prepositions, etc.)

## Returns

[`TitleCase`](../type-aliases/TitleCase.md)\<`S`\>

## Source

[src/string/index.ts:737](https://github.com/umatch-oficial/utils/blob/1813ff9/src/string/index.ts#L737)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
