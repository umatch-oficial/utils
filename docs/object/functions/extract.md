[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [object](../README.md) / extract

# Function: extract()

```ts
function extract<T, K, V, Options>(obj, options): T extends Dictionary ? Options extends {
  prefix: infer Prefix;
 } ? [{ [Key in keyof T as Key extends `${Prefix & string}${infer Rest}` ? Options extends Object ? Key : Rest : never]: T[Key] }, { [Key in keyof T as Key extends `${Prefix & string}${infer _}` ? never : Key]: T[Key] }] : Options extends {
  suffix: infer Suffix;
 } ? [{ [Key in keyof T as Key extends `${infer Rest}${Suffix & string}` ? Options extends Object ? Key : Rest : never]: T[Key] }, { [Key in keyof T as Key extends `${infer _}${Suffix & string}` ? never : Key]: T[Key] }] : Options extends {
  keys: readonly K[];
 } ? [Pick<T, K>, Omit<T, K>] : Options extends {
  keys: (key) => boolean;
 } ? [{}, {}] : Options extends {
  values: (value) => boolean;
 } ? [{}, {}] : never : Dictionary
```

Dynamic version of pick.

Returns two copies of an object: one containing only the keys that
match the rule, and another one containing the keys that don't
match. The rule can be a pattern (prefix, suffix or custom regular
expression), a list of keys, a function to filter keys, or a
function to filter values. If the rule is a prefix or suffix,
removes the prefix/suffix from the matched keys (can be turned off
with the rename option).

## Type Parameters

• **T** *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md)

• **K** *extends* `string` \| `number` \| `symbol`

• **V** *extends* `unknown`

• **Options** *extends* 
  \| \{
  `custom`: `RegExp`;
 \}
  \| \{
  `keys`: (`key`) => `boolean`;
 \}
  \| \{
  `keys`: readonly `string`[];
 \}
  \| \{
  `values`: (`value`) => `boolean`;
 \}
  \| \{
  `prefix`: `string`;
  `rename`: `boolean`;
 \}
  \| \{
  `rename`: `boolean`;
  `suffix`: `string`;
 \}

## Parameters

• **obj**: `T`

• **options**: `Options`

## Returns

`T` *extends* [`Dictionary`](../../index/type-aliases/Dictionary.md) ? `Options` *extends* \{
  `prefix`: infer Prefix;
 \} ? [\{ \[Key in keyof T as Key extends \`$\{Prefix & string\}$\{infer Rest\}\` ? Options extends Object ? Key : Rest : never\]: T\[Key\] \}, \{ \[Key in keyof T as Key extends \`$\{Prefix & string\}$\{infer \_\}\` ? never : Key\]: T\[Key\] \}] : `Options` *extends* \{
  `suffix`: infer Suffix;
 \} ? [\{ \[Key in keyof T as Key extends \`$\{infer Rest\}$\{Suffix & string\}\` ? Options extends Object ? Key : Rest : never\]: T\[Key\] \}, \{ \[Key in keyof T as Key extends \`$\{infer \_\}$\{Suffix & string\}\` ? never : Key\]: T\[Key\] \}] : `Options` *extends* \{
  `keys`: readonly `K`[];
 \} ? [`Pick`\<`T`, `K`\>, `Omit`\<`T`, `K`\>] : `Options` *extends* \{
  `keys`: (`key`) => `boolean`;
 \} ? [\{\}, \{\}] : `Options` *extends* \{
  `values`: (`value`) => `boolean`;
 \} ? [\{\}, \{\}] : `never` : [`Dictionary`](../../index/type-aliases/Dictionary.md)

## Defined in

[src/object/index.ts:102](https://github.com/umatch-oficial/utils/blob/main/src/object/index.ts#L102)
