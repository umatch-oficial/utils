**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [object](../index.md) / extract

# Function: extract()

> **extract**\<`T`, `K`, `V`, `Options`\>(`obj`, `options`): `T` extends [`Dictionary`](../../index/type-aliases/Dictionary.md) ? `Options` extends `Object` ? [{ [Key in keyof T as Key extends \`${Prefix & string}${infer Rest}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, { [Key in keyof T as Key extends \`${Prefix & string}${infer _}\` ? never : Key]: T[Key] }] : `Options` extends `Object` ? [{ [Key in keyof T as Key extends \`${infer Rest}${Suffix & string}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, { [Key in keyof T as Key extends \`${infer _}${Suffix & string}\` ? never : Key]: T[Key] }] : `Options` extends `Object` ? [`Pick`\<`T`, `K`\>, `Omit`\<`T`, `K`\>] : `Options` extends `Object` ? [`Object`, `Object`] : `Options` extends `Object` ? [`Object`, `Object`] : `never` : [`Dictionary`](../../index/type-aliases/Dictionary.md)

Dynamic version of pick.

Returns two copies of an object: one containing only the keys that
match the rule, and another one containing the keys that don't
match. The rule can be a pattern (prefix, suffix or custom regular
expression), a list of keys, a function to filter keys, or a
function to filter values. If the rule is a prefix or suffix,
removes the prefix/suffix from the matched keys (can be turned off
with the rename option).

## Type parameters

• **T** extends [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **K** extends `string` \| `number` \| `symbol`

• **V** extends `unknown`

• **Options** extends `Object` \| `Object` \| `Object` \| `Object` \| `Object` \| `Object`

## Parameters

• **obj**: `T`

• **options**: `Options`

## Returns

`T` extends [`Dictionary`](../../index/type-aliases/Dictionary.md) ? `Options` extends `Object` ? [{ [Key in keyof T as Key extends \`${Prefix & string}${infer Rest}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, { [Key in keyof T as Key extends \`${Prefix & string}${infer _}\` ? never : Key]: T[Key] }] : `Options` extends `Object` ? [{ [Key in keyof T as Key extends \`${infer Rest}${Suffix & string}\` ? Options extends Object ? Key : Rest : never]: T[Key] }, { [Key in keyof T as Key extends \`${infer _}${Suffix & string}\` ? never : Key]: T[Key] }] : `Options` extends `Object` ? [`Pick`\<`T`, `K`\>, `Omit`\<`T`, `K`\>] : `Options` extends `Object` ? [`Object`, `Object`] : `Options` extends `Object` ? [`Object`, `Object`] : `never` : [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Source

[src/object/index.ts:102](https://github.com/umatch-oficial/utils/blob/0b3210d/src/object/index.ts#L102)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
