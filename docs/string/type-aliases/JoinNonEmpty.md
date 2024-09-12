[**About this project**](../../README.md) • **Docs**

***

[@umatch/utils](../../api.md) / [string](../README.md) / JoinNonEmpty

# Type Alias: JoinNonEmpty\<T, Sep, Acc\>

```ts
type JoinNonEmpty<T, Sep, Acc>: T extends readonly [infer Element, ...(infer Rest extends readonly Primitive[])] ? null | undefined extends Element ? JoinNonEmpty<Rest, Sep, Acc> : Element extends string ? Trim<Element> extends "" ? JoinNonEmpty<Rest, Sep, Acc> : Acc extends "" ? JoinNonEmpty<Rest, Sep, Element> : JoinNonEmpty<Rest, Sep, `${Acc}${Sep}${Element}`> : Acc extends "" ? JoinNonEmpty<Rest, Sep, Element & string> : JoinNonEmpty<Rest, Sep, `${Acc}${Sep}${Element & string}`> : Acc;
```

## Type Parameters

• **T** *extends* readonly [`Primitive`](../../index/type-aliases/Primitive.md)[]

• **Sep** *extends* `string` = `""`

• **Acc** *extends* `string` = `""`

## Defined in

[src/string/index.ts:315](https://github.com/umatch-oficial/utils/blob/main/src/string/index.ts#L315)
