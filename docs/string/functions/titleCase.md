[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / titleCase

# Function: titleCase()

```ts
function titleCase<S>(str, skipWords?): TitleCase<S>
```

Converts a string to Title Case.

Some words should not be capitalized, depending on the language.

## Type Parameters

• **S** *extends* `string`

## Parameters

• **str**: `S`

• **skipWords?**: readonly `string`[] = `ENGLISH_SKIP_WORDS`

Words to skip. Default: english skip words (articles, prepositions, etc.)

## Returns

[`TitleCase`](../type-aliases/TitleCase.md)\<`S`\>

## Defined in

[src/string/index.ts:759](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L759)
