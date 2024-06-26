**@umatch/utils** • [Readme](../../index.md) \| [Modules](../../modules.md)

***

[@umatch/utils](../../modules.md) / [string](../index.md) / JoinNonEmpty

# Type alias: JoinNonEmpty\<T, Sep, Acc\>

> **JoinNonEmpty**\<`T`, `Sep`, `Acc`\>: `T` extends readonly [infer Element, `...(infer Rest extends readonly Primitive[])`] ? `null` \| `undefined` extends `Element` ? [`JoinNonEmpty`](JoinNonEmpty.md)\<`Rest`, `Sep`, `Acc`\> : `Element` extends `string` ? [`Trim`](Trim.md)\<`Element`\> extends `""` ? [`JoinNonEmpty`](JoinNonEmpty.md)\<`Rest`, `Sep`, `Acc`\> : `Acc` extends `""` ? [`JoinNonEmpty`](JoinNonEmpty.md)\<`Rest`, `Sep`, `Element`\> : [`JoinNonEmpty`](JoinNonEmpty.md)\<`Rest`, `Sep`, \`${Acc}${Sep}${Element}\`\> : `Acc` extends `""` ? [`JoinNonEmpty`](JoinNonEmpty.md)\<`Rest`, `Sep`, `Element` & `string`\> : [`JoinNonEmpty`](JoinNonEmpty.md)\<`Rest`, `Sep`, \`${Acc}${Sep}${Element & string}\`\> : `Acc`

## Type parameters

• **T** extends readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **Sep** extends `string` = `""`

• **Acc** extends `string` = `""`

## Source

[src/string/index.ts:315](https://github.com/umatch-oficial/utils/blob/6b2757d/src/string/index.ts#L315)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
