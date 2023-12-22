**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [index](../index.md) / Merge

# Type alias: Merge\<A, B\>

> **Merge**\<`A`, `B`\>: `{ [K in keyof A | keyof B]: K extends keyof B ? K extends keyof A ? A[K] extends Dictionary ? B[K] extends Dictionary ? Merge<A[K], B[K]> : B[K] : B[K] : B[K] : K extends keyof A ? A[K] : never }`

Deep merges two dictionaries. Values from the right have higher priority.

## Type parameters

• **A**

• **B**

## Source

[src/index.ts:79](https://github.com/umatch-oficial/utils/blob/6e00801/src/index.ts#L79)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
