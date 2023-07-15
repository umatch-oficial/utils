[**@umatch/utils**](../../README.md) ( [Readme](../../README.md) \| [API](../../API.md) )

---

[@umatch/utils](../../API.md) > [index](../README.md) > Merge

# Type alias: Merge`<A, B>`

> **Merge**: \<`A`, `B`\> \{ [K in keyof A \| keyof B]: K extends keyof B ? K extends keyof A ? A[K] extends Dictionary ? B[K] extends Dictionary ? Merge\<A[K], B[K]\> : B[K] : B[K] : B[K] : K extends keyof A ? A[K] : never }

Deep merges two dictionaries. Values from the right have higher priority.

## Type parameters

| Parameter |
| :-------- |
| `A`       |
| `B`       |

## Source

[src/index.ts:73](https://github.com/umatch-oficial/utils/blob/00cf87f/src/index.ts#L73)

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)