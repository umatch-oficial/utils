[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [string](../README.md) > CamelToSnakeCase

# Type alias: CamelToSnakeCase`<S, Acc, Buffer>`

> **CamelToSnakeCase**: \<`S`, `Acc`, `Buffer`\> `S` _extends_ \`$\{infer First}$\{infer Rest}\` ? [`CamelToSnakeCase`](type-alias.CamelToSnakeCase.md)\< `Rest`, `First` _extends_ `Uppercase`\< `First` \> ? `Rest` _extends_ \`$\{infer Second}$\{infer \_}\` ? `Second` _extends_ `Lowercase`\< `Second` \> ? `JoinNonEmpty`\< [`Acc`, `Buffer`, `Lowercase`\< `First` \>], `"_"` \> : `Acc` : `JoinNonEmpty`\< [`Acc`, `Buffer`, `Lowercase`\< `First` \>], `"_"` \> : \`$\{Acc}$\{First}\`, `First` _extends_ `Uppercase`\< `First` \> ? \`$\{Buffer}$\{Lowercase\<First\>}\` : `""` \> : `Acc` & `string`

Converts a string from camel to snake case.

Iterates one letter at a time, keeping the result in an
accumulator and consecutive uppercase letters in a buffer.

## Type parameters

| Parameter                   | Default |
| :-------------------------- | :------ |
| `S` _extends_ `string`      | -       |
| `Acc` _extends_ `string`    | `""`    |
| `Buffer` _extends_ `string` | `""`    |

## Source

[src/string/index.ts:618](https://github.com/umatch-oficial/utils/blob/1dcf13d/src/string/index.ts#L618)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
