**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / CamelToSnakeCase

# Type alias: CamelToSnakeCase\<S, Acc, Buffer\>

> **CamelToSnakeCase**\<`S`, `Acc`, `Buffer`\>: `S` extends \`${infer First}${infer Rest}\` ? [`CamelToSnakeCase`](CamelToSnakeCase.md)\<`Rest`, `First` extends `Uppercase`\<`First`\> ? `Rest` extends \`${infer Second}${infer _}\` ? `Second` extends `Lowercase`\<`Second`\> ? `JoinNonEmpty`\<[`Acc`, `Buffer`, `Lowercase`\<`First`\>], `"_"`\> : `Acc` : `JoinNonEmpty`\<[`Acc`, `Buffer`, `Lowercase`\<`First`\>], `"_"`\> : \`${Acc}${First}\`, `First` extends `Uppercase`\<`First`\> ? \`${Buffer}${Lowercase<First>}\` : `""`\> : `Acc` & `string`

Converts a string from camel to snake case.

Iterates one letter at a time, keeping the result in an
accumulator and consecutive uppercase letters in a buffer.

## Type parameters

• **S** extends `string`

• **Acc** extends `string` = `""`

• **Buffer** extends `string` = `""`

## Source

[src/string/index.ts:618](https://github.com/umatch-oficial/utils/blob/1c5b195/src/string/index.ts#L618)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
