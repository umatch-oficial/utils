[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [object](../README.md) > extract

# Function: extract()

> **extract**\<`T`, `K`, `V`, `Options`\>(`obj`, `options`): `T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) ? `Options` _extends_ \{`prefix`: infer Prefix;} ? [\{ [Key in keyof T as Key extends \`$\{Prefix & string}$\{infer Rest}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, \{ [Key in keyof T as Key extends \`$\{Prefix & string}$\{infer \_}\` ? never : Key]: T[Key] }] : `Options` _extends_ \{`suffix`: infer Suffix;} ? [\{ [Key in keyof T as Key extends \`$\{infer Rest}$\{Suffix & string}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, \{ [Key in keyof T as Key extends \`$\{infer \_}$\{Suffix & string}\` ? never : Key]: T[Key] }] : `Options` _extends_ \{`keys`: _readonly_ `K`[];} ? [`Pick`\< `T`, `K` \>, `Omit`\< `T`, `K` \>] : `Options` _extends_ \{`keys`: (`key`) => `boolean`;} ? [\{}, \{}] : `Options` _extends_ \{`values`: (`value`) => `boolean`;} ? [\{}, \{}] : `never` : [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)

Dynamic version of pick.

Returns two copies of an object: one containing only the keys that
match the rule, and another one containing the keys that don't
match. The rule can be a pattern (prefix, suffix or custom regular
expression), a list of keys, a function to filter keys, or a
function to filter values. If the rule is a prefix or suffix,
removes the prefix/suffix from the matched keys (can be turned off
with the rename option).

## Type parameters

| Parameter                                                                                                                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)                                                                                                                                                                           |
| `K` _extends_ `string` \| `number` \| `symbol`                                                                                                                                                                                                            |
| `V` _extends_ `unknown`                                                                                                                                                                                                                                   |
| `Options` _extends_ \{`custom`: `RegExp`;} \| \{`keys`: (`key`) => `boolean`;} \| \{`keys`: _readonly_ `string`[];} \| \{`values`: (`value`) => `boolean`;} \| \{`prefix`: `string`; `rename`: `boolean`;} \| \{`rename`: `boolean`; `suffix`: `string`;} |

## Parameters

| Parameter | Type      |
| :-------- | :-------- |
| `obj`     | `T`       |
| `options` | `Options` |

## Returns

`T` _extends_ [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md) ? `Options` _extends_ \{`prefix`: infer Prefix;} ? [\{ [Key in keyof T as Key extends \`$\{Prefix & string}$\{infer Rest}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, \{ [Key in keyof T as Key extends \`$\{Prefix & string}$\{infer \_}\` ? never : Key]: T[Key] }] : `Options` _extends_ \{`suffix`: infer Suffix;} ? [\{ [Key in keyof T as Key extends \`$\{infer Rest}$\{Suffix & string}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, \{ [Key in keyof T as Key extends \`$\{infer \_}$\{Suffix & string}\` ? never : Key]: T[Key] }] : `Options` _extends_ \{`keys`: _readonly_ `K`[];} ? [`Pick`\< `T`, `K` \>, `Omit`\< `T`, `K` \>] : `Options` _extends_ \{`keys`: (`key`) => `boolean`;} ? [\{}, \{}] : `Options` _extends_ \{`values`: (`value`) => `boolean`;} ? [\{}, \{}] : `never` : [`Dictionary`](../../index/type-aliases/type-alias.Dictionary.md)

## Source

[src/object/index.ts:105](https://github.com/umatch-oficial/utils/blob/a4be831/src/object/index.ts#L105)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
