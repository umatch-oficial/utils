# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [10.1.0](https://github.com/umatch-oficial/utils/compare/v10.0.1...v10.1.0) (2023-06-28)


### Features

* allow readonly arrays in many functions ([9152c47](https://github.com/umatch-oficial/utils/commit/9152c477806a01894da2563088ab1b113952159c))
* **array:** add formatMatrixToString() ([7d29b35](https://github.com/umatch-oficial/utils/commit/7d29b3532472b21daf893aafd13018f5ab10aa24))
* **array:** add transpose() ([e2b5ba4](https://github.com/umatch-oficial/utils/commit/e2b5ba40c771ce2e1a2ef7551f6fa1db5336c201))
* **math:** add maxProperty() ([c721b92](https://github.com/umatch-oficial/utils/commit/c721b92a42f18160f7221925111bcf0778c0a399))

## [10.0.1](https://github.com/umatch-oficial/utils/compare/v10.0.0...v10.0.1) (2023-06-26)


### Bug Fixes

* **array:** include bigint in typing of input of joinNonEmpty() ([3ae690b](https://github.com/umatch-oficial/utils/commit/3ae690b856ab4e28fe44bf4d04af8f65029db671))

## [10.0.0](https://github.com/umatch-oficial/utils/compare/v9.0.3...v10.0.0) (2023-06-26)


### ⚠ BREAKING CHANGES

* **index:** the Primitive type and the associated isPrimitive() function now include bigint, null and undefined.
* **index:** isJSObject() has been renamed to isPlainObject().

### Bug Fixes

* **index:** add bigint, null & undefined to Primitive ([82324cc](https://github.com/umatch-oficial/utils/commit/82324ccf4a925522f13c0cb0a15539cd4016bce8))


* **index:** rename isJSObject() to isPlainObject() ([645dec6](https://github.com/umatch-oficial/utils/commit/645dec6c1cbc8e45f8f031bc94d24440eb3f0390))

## [9.0.3](https://github.com/umatch-oficial/utils/compare/v9.0.2...v9.0.3) (2023-06-26)


### Bug Fixes

* **array:** include boolean in typing of input of joinNonEmpty() ([0b0d181](https://github.com/umatch-oficial/utils/commit/0b0d18152b146eb58a4de99472fc9cccee86ef8a))

## [9.0.2](https://github.com/umatch-oficial/utils/compare/v9.0.1...v9.0.2) (2023-06-26)


### Bug Fixes

* **array:** include null in typing of input of joinNonEmpty() ([92c076d](https://github.com/umatch-oficial/utils/commit/92c076dcacf6443b668cd1e31aa73f64851d9df0))

## [9.0.1](https://github.com/umatch-oficial/utils/compare/v9.0.0...v9.0.1) (2023-06-22)


### Bug Fixes

* **math:** fix round() for numbers close to 2^-52 ([abca730](https://github.com/umatch-oficial/utils/commit/abca730427dc50dcb499ef0c49994eea5ad584b5))

## [9.0.0](https://github.com/umatch-oficial/utils/compare/v8.2.1...v9.0.0) (2023-06-16)


### ⚠ BREAKING CHANGES

* **object:** object.merge() no longer throws an error if the strategy is set to 'concat' and the value at a given path is an array on the target object but not an array on the source object.

### Features

* **object:** deep clone inputs in merge() and remove thrown error ([95ebd9d](https://github.com/umatch-oficial/utils/commit/95ebd9d5e2e8d0c17c0f804c283c064dc9658450))

## [8.2.1](https://github.com/umatch-oficial/utils/compare/v8.2.0...v8.2.1) (2023-06-12)


### Bug Fixes

* **index:** export functions ([90496d1](https://github.com/umatch-oficial/utils/commit/90496d17c0911558767b5f8efd1a213ccc6247f5))
* **index:** fix Flatten and Subtract ([67e64db](https://github.com/umatch-oficial/utils/commit/67e64db413ab1688bcb9c4973b843694090f6e51))

## [8.2.0](https://github.com/umatch-oficial/utils/compare/v8.1.0...v8.2.0) (2023-06-12)


### Features

* **array:** add joinNonEmpty() ([9c6651d](https://github.com/umatch-oficial/utils/commit/9c6651d8dea28ed8bb92a5c13e4ef83d0d41a901))
* **index:** add isFunction() and isPrimitive() ([91881ad](https://github.com/umatch-oficial/utils/commit/91881adb5f37ceb8dfbc118cefd3e51a2a7cc4ca))
* **object:** add deepClone() ([93d8fb7](https://github.com/umatch-oficial/utils/commit/93d8fb7ef1e739a532b7398e22a0475cf9273c3a))
* **object:** use deepClone() instead of structuredClone() ([22c6650](https://github.com/umatch-oficial/utils/commit/22c665058a89d6d82ea0f863a9f590206c528e12))

## [8.1.0](https://github.com/umatch-oficial/utils/compare/v8.0.0...v8.1.0) (2023-06-12)


### Features

* **math:** add sumProperty() ([9d55490](https://github.com/umatch-oficial/utils/commit/9d5549004fd9ce320d8166a416f96681a3ccd8ab))
* **string:** allow custom character for padding in center() ([5365c33](https://github.com/umatch-oficial/utils/commit/5365c33841ed7a6e124ebaa4f410282a1f63e354))


### Bug Fixes

* **object:** fix omit ([d403ad2](https://github.com/umatch-oficial/utils/commit/d403ad2b6440c60b7d70b99dabdab2e1ce2d2ca5))

## [8.0.0](https://github.com/umatch-oficial/utils/compare/v7.0.1...v8.0.0) (2023-06-06)


### ⚠ BREAKING CHANGES

* **object:** object.remove() has been removed. object.extract() now returns a tuple with 2 copies, one containing the matched keys and one containing the non-matched keys.

### Features

* **object:** merge remove() into extract() and return tuple of matching and non-matching copies ([c383b53](https://github.com/umatch-oficial/utils/commit/c383b534fabb84176d9028a4e0142f5b4d8018f8))
* **object:** use structuredClone in apply(), omit(), pick() and rename() ([54e7f1f](https://github.com/umatch-oficial/utils/commit/54e7f1f07a2dbae1a2e2f917586acb8ea2986240))


### Bug Fixes

* **math:** fix randomNumber() when min is 0 ([43cc47a](https://github.com/umatch-oficial/utils/commit/43cc47a30fa1e5f163af028b8ca0b909b0f4ba8e))

## [7.0.1](https://github.com/umatch-oficial/utils/compare/v7.0.0...v7.0.1) (2023-06-05)


### Bug Fixes

* **string:** improve parseFunctionCall() ([1fdddf9](https://github.com/umatch-oficial/utils/commit/1fdddf95e5221c8bfceb3be17b2c44e73e674980))

## [7.0.0](https://github.com/umatch-oficial/utils/compare/v6.4.1...v7.0.0) (2023-06-03)


### ⚠ BREAKING CHANGES

* **string:** string.parse() has been renamed to string.removeAccents()

### Features

* **array:** add subtract - alias for diff() ([1d63dda](https://github.com/umatch-oficial/utils/commit/1d63dda984718f73aafd9726ab9933814a6d5cd3))
* **array:** improve return type of diff with readonly inputs ([7d75b41](https://github.com/umatch-oficial/utils/commit/7d75b41533215b6cff49b25e5a493f66dc962ecb))
* **index:** add IsReadonly ([3858524](https://github.com/umatch-oficial/utils/commit/3858524168a5a635d5a847e8a0d76e8c6b712227))
* **index:** add Subtract ([c666439](https://github.com/umatch-oficial/utils/commit/c66643923c48bf601aa8637a03104456d19cfc70))
* **index:** allow readonly array in Flatten ([ff7ff17](https://github.com/umatch-oficial/utils/commit/ff7ff176fe95a6087980fc61756c4775758d7463))
* **math:** add sum() ([d72057e](https://github.com/umatch-oficial/utils/commit/d72057e379472b631f667e307c225a76bfd627d0))
* **string:** add parseFunctionCall() ([9c013f7](https://github.com/umatch-oficial/utils/commit/9c013f74b175b1fe24d790c5fae4d6566691a27b))
* **string:** add parseNumber() ([a594a2d](https://github.com/umatch-oficial/utils/commit/a594a2d0204534116d10e71d6d91ccc6301e4567))
* **string:** rename function parse to removeAccents ([5776c2c](https://github.com/umatch-oficial/utils/commit/5776c2cd91f851d92fcfa636c49612acb9d5a25d))
* **string:** stop validating unitsThresholds in getCountDown() and validate dictionary for all units, not just the final one ([b17b0af](https://github.com/umatch-oficial/utils/commit/b17b0af0d23ed22dad5f7b0488e34408e3f9dea4))

## [6.4.1](https://github.com/umatch-oficial/utils/compare/v6.4.0...v6.4.1) (2023-05-30)


### Bug Fixes

* **string:** add new argument to Pluralizer type ([5b6f336](https://github.com/umatch-oficial/utils/commit/5b6f3366e82b6165f1bf017aff55fec021efe74d))

## [6.4.0](https://github.com/umatch-oficial/utils/compare/v6.3.0...v6.4.0) (2023-05-30)


### Features

* **string:** allow a custom plural in basicPluralizer ([b32b565](https://github.com/umatch-oficial/utils/commit/b32b5657206e3fa9e0bf0b45bdd3da05eabcf46c))

## [6.3.0](https://github.com/umatch-oficial/utils/compare/v6.2.2...v6.3.0) (2023-05-30)


### Features

* **array:** improve return type of groupBy() when input is generic ([2207c74](https://github.com/umatch-oficial/utils/commit/2207c745b2e4d672025610bef242f06958728922))

## [6.2.2](https://github.com/umatch-oficial/utils/compare/v6.2.1...v6.2.2) (2023-05-22)


### Bug Fixes

* **object:** restore behavior of setDeepProperty() in deep paths with undefined values ([94ed7a1](https://github.com/umatch-oficial/utils/commit/94ed7a12259623eaab35386c9c5d22bd7be5d66b))

## [6.2.1](https://github.com/umatch-oficial/utils/compare/v6.2.0...v6.2.1) (2023-05-22)


### Bug Fixes

* **object:** stop throwing an error if element is not an array nor a plain JS object ([b8b56e4](https://github.com/umatch-oficial/utils/commit/b8b56e4b3d5366ab1bf7d6af5a622944c1474dfc))

## [6.2.0](https://github.com/umatch-oficial/utils/compare/v6.1.0...v6.2.0) (2023-05-19)


### Features

* **index:** add isNullOrUndefined() ([0667251](https://github.com/umatch-oficial/utils/commit/0667251970f42202e62f0ddd83c801e5f4b14e8c))
* **object:** change setDeepProperty() behavior and handle errors ([e1995f5](https://github.com/umatch-oficial/utils/commit/e1995f5cb735dfee7263341cace6a71cad410908))


### Bug Fixes

* **object:** allow unknown[] in the first parameter of getDeepProperty() ([20e4a9c](https://github.com/umatch-oficial/utils/commit/20e4a9c61507fd0e6958ddc5328fa906746c2a25))
* **object:** allow unknown[] in the first parameter of setDeepProperty() ([8b3d134](https://github.com/umatch-oficial/utils/commit/8b3d13409fb785719cf5a70a6d7e1e510d6b51c4))

## [6.1.0](https://github.com/umatch-oficial/utils/compare/v6.0.0...v6.1.0) (2023-04-11)


### Features

* **types:** add PickByType ([8ae64f0](https://github.com/umatch-oficial/utils/commit/8ae64f01f97941be25ce7241c5b8346bbee17c76))

## [6.0.0](https://github.com/umatch-oficial/utils/compare/v5.1.0...v6.0.0) (2023-04-06)


### ⚠ BREAKING CHANGES

* **string:** basicPluralizer() no longer prepends the quantity in the output.

### Features

* **string:** remove quantity from output of basicPluralizer() ([51acf96](https://github.com/umatch-oficial/utils/commit/51acf96ca12994a8dbf43f68eb67806edc606973))

## [5.1.0](https://github.com/umatch-oficial/utils/compare/v5.0.0...v5.1.0) (2023-04-05)


### Features

* **object:** simplify output type of getDeepProperty() ([0af51bd](https://github.com/umatch-oficial/utils/commit/0af51bd6b5b8bdd02570875aa1bba9113a9d1b05))

## [5.0.0](https://github.com/umatch-oficial/utils/compare/v4.3.0...v5.0.0) (2023-04-05)


### ⚠ BREAKING CHANGES

* **object:** getDeepProperty() now returns undefined instead of the original object if the path is falsy.

### Features

* **object:** improve output type of getDeepProperty() ([9d77880](https://github.com/umatch-oficial/utils/commit/9d778806e14893bbacc0d06b6ecdbfb37ce78374))

## [4.3.0](https://github.com/umatch-oficial/utils/compare/v4.1.1...v4.3.0) (2023-04-05)


### Features

* **types:** add DeepValueOf ([684ae81](https://github.com/umatch-oficial/utils/commit/684ae81d2866199d897611a3abc42f6d5487914f))
* **types:** add fallback behavior for GroupBy ([dab2b59](https://github.com/umatch-oficial/utils/commit/dab2b5972566b125967abec08cdff260c380e0e7))
* **types:** add fallback behavior for NestedPaths ([5536918](https://github.com/umatch-oficial/utils/commit/5536918b57d7c6da8227003dbc455ed555613f2f))


### Bug Fixes

* **array:** filterByObject returns the union of the array objects and the template ([0ed10f1](https://github.com/umatch-oficial/utils/commit/0ed10f1871cd566d85067fbc7b09a9d1b0b97ccb))

## [4.2.0](https://github.com/umatch-oficial/utils/compare/v4.1.1...v4.2.0) (2023-04-01)


### Features

* **types:** add fallback behavior for GroupBy ([dab2b59](https://github.com/umatch-oficial/utils/commit/dab2b5972566b125967abec08cdff260c380e0e7))
* **types:** add fallback behavior for NestedPaths ([5536918](https://github.com/umatch-oficial/utils/commit/5536918b57d7c6da8227003dbc455ed555613f2f))


### Bug Fixes

* **array:** filterByObject returns the union of the array objects and the template ([0ed10f1](https://github.com/umatch-oficial/utils/commit/0ed10f1871cd566d85067fbc7b09a9d1b0b97ccb))

## [4.1.1](https://github.com/umatch-oficial/utils/compare/v4.1.0...v4.1.1) (2023-03-28)


### Bug Fixes

* **array:** filterByObject only filtered by the last property in the template ([965427f](https://github.com/umatch-oficial/utils/commit/965427f58c3ea98466af6cb16fc45f33f8cadb1c))

## [4.1.0](https://github.com/umatch-oficial/utils/compare/v4.0.2...v4.1.0) (2023-03-27)


### Features

* **array:** allow unknown or readonly array in groupBy() ([9a65380](https://github.com/umatch-oficial/utils/commit/9a6538012f892f124eb1bbae25874d3925c11481))

## [4.0.2](https://github.com/umatch-oficial/utils/compare/v4.0.1...v4.0.2) (2023-03-25)


### Bug Fixes

* **array:** allow readonly arrays in cartesian() ([cc6a711](https://github.com/umatch-oficial/utils/commit/cc6a7112aff7ef481fb20087170f970f10902a9e))

## [4.0.1](https://github.com/umatch-oficial/utils/compare/v4.0.0...v4.0.1) (2023-03-21)


### Bug Fixes

* move commit-and-tag-version to devDependencies ([3cd84c3](https://github.com/umatch-oficial/utils/commit/3cd84c35a0c91819d4658c6cb5ff0c3b555f4085))

## [4.0.0](https://github.com/umatch-oficial/utils/compare/v3.0.1...v4.0.0) (2023-03-21)


### ⚠ BREAKING CHANGES

* **array:** array.replicate() has been removed
* **object:** remove() no longer returns the original object, rather a new object composed of the removed entries

### Features

* **array:** remove deprecated replicate() ([6929314](https://github.com/umatch-oficial/utils/commit/692931456e14c790066a312985318714369eefca))
* **array:** restrict type of item in remove() to string, boolean, or number ([64493aa](https://github.com/umatch-oficial/utils/commit/64493aa5caa9470ed4a8f91503f9b3bf5a5e4c01))
* **object:** remove() returns the removed entries rather than the object ([85b8b5f](https://github.com/umatch-oficial/utils/commit/85b8b5f530bc8cb6eb8a9fd8a92cebf7d4ad1ad3))

## [3.0.1](https://github.com/umatch-oficial/utils/compare/v3.0.0...v3.0.1) (2023-03-18)

## [3.0.0](https://github.com/umatch-oficial/utils/compare/v2.4.2...v3.0.0) (2023-03-17)


### ⚠ BREAKING CHANGES

* **string:** titleCase() and sentenceCase() no longer split single into multiple words

### Features

* **array:** improve typing of filterWithComplement ([1dd0842](https://github.com/umatch-oficial/utils/commit/1dd084205711cc6a51726152c6be8adf51a11b2c))
* **csv:** add csv module ([bfb66b6](https://github.com/umatch-oficial/utils/commit/bfb66b6d9293b20d6f832d25b2a81b0053877a46))
* **string:** improve the default 2nd parameter for titleCase() ([3c788cc](https://github.com/umatch-oficial/utils/commit/3c788cc133814bc53b173107432ef508635eb61e))


### Bug Fixes

* **string:** titleCase() and sentenceCase() now preserve punctuation ([501f1de](https://github.com/umatch-oficial/utils/commit/501f1de5da08d29ba660b6f6477d5053c4edf424))

## [2.4.2](https://github.com/umatch-oficial/utils/compare/v2.4.1...v2.4.2) (2023-03-17)


### Bug Fixes

* publish src directory ([608bbd3](https://github.com/umatch-oficial/utils/commit/608bbd36ba9eed19ac12df4143925758aba39339))

## [2.4.1](https://github.com/umatch-oficial/utils/compare/v2.4.0...v2.4.1) (2023-03-15)

## [2.4.0](https://github.com/umatch-oficial/utils/compare/v2.3.0...v2.4.0) (2023-03-14)


### Features

* **array:** add filterByObject() ([ee3cc05](https://github.com/umatch-oficial/utils/commit/ee3cc05fa653f9de3b18e5b7cd42c5d72319ea59))

## [2.3.0](https://github.com/umatch-oficial/utils/compare/v2.2.0...v2.3.0) (2023-03-13)


### ⚠ BREAKING CHANGES

* **object:** The filter function must now be encapsulated in an object, inside the 'keys'
property.

### Features

* **object:** allow remove() to filter by values as well ([82b6287](https://github.com/umatch-oficial/utils/commit/82b6287a135404fa2a07240c2a1282fca2bbc727))

## [2.2.0](https://github.com/umatch-oficial/utils/compare/v2.1.0...v2.2.0) (2023-03-13)


### Features

* **object:** allow remove() to receive a filter function ([2707421](https://github.com/umatch-oficial/utils/commit/2707421b9655867d1d5f714f6f629fea5ce978f7))

## [2.1.0](https://github.com/umatch-oficial/utils/compare/v2.0.0...v2.1.0) (2023-03-13)


### Features

* **array:** add hasSameElements() ([2c0e903](https://github.com/umatch-oficial/utils/commit/2c0e90353542961d5892c2fef692334f4d8facc7))

## [2.0.0](https://github.com/umatch-oficial/utils/compare/v1.23.3...v2.0.0) (2023-03-11)


### ⚠ BREAKING CHANGES

* **types:** type Exact has been removed
* **object:** object.getDeepProperty() no longer throws if path is not found
* **object:** removed object.isPlainObject()

### Features

* add isArray(), isBoolean(), isDate(), isNumber(), isString() ([0dbbcdd](https://github.com/umatch-oficial/utils/commit/0dbbcddcea91699072209372cfbb7bd7e12de6a1))
* **object:** add recursive Merge type for merge() ([b2612da](https://github.com/umatch-oficial/utils/commit/b2612da65962fba7a735979124f08a254fb341b0))
* **object:** allow unknown parameters in merge() ([49dafa5](https://github.com/umatch-oficial/utils/commit/49dafa57e35ebb46c60fec112d044e548a36aad6))
* **object:** setDeepProperty() fills in gaps in the path ([e299166](https://github.com/umatch-oficial/utils/commit/e29916649e6a151dbd4dae0ba2357894aaf1e943))
* **types:** add OneOrArray type ([4670031](https://github.com/umatch-oficial/utils/commit/4670031601d31bf9e1e8499cf835b597ff016020))


### Bug Fixes

* **object:** getDeepProperty() no longer throws if path is not found ([22b1cc9](https://github.com/umatch-oficial/utils/commit/22b1cc912c0e3a3fbde80c6ed4540c8a316e1d77))
* **object:** merge() now merges nested objects instead of overriding them ([4690557](https://github.com/umatch-oficial/utils/commit/4690557dd9b9507d6ccd252515e0750573ae4d2a))
* **object:** use given separator to replace bracket notation in setDeepProperty() ([33ef768](https://github.com/umatch-oficial/utils/commit/33ef76828f51694f6c29c11f0e50a746e41e4149))
* **types:** remove type Exact ([8acfaf9](https://github.com/umatch-oficial/utils/commit/8acfaf93cf2d2a6979af4ad3a477b1cce1911d35))


* **object:** remove isPlainObject(), add isJSObject() and isObject() ([a9d9c6e](https://github.com/umatch-oficial/utils/commit/a9d9c6e12786220477103cdad04e7a8672b63c44))

## [1.23.3](https://github.com/umatch-oficial/utils/compare/v1.23.2...v1.23.3) (2023-03-10)

## [1.23.2](https://github.com/umatch-oficial/utils/compare/v1.23.1...v1.23.2) (2023-03-08)

## [1.23.1](https://github.com/umatch-oficial/utils/compare/v1.23.0...v1.23.1) (2023-03-07)

## [1.23.0](https://github.com/umatch-oficial/utils/compare/v1.22.1...v1.23.0) (2023-03-06)


### Features

* add array.isSubset() ([39c8d93](https://github.com/umatch-oficial/utils/commit/39c8d937908d56cc633425c49cf1a8408b618b1d))


### Bug Fixes

* make tests more reliable ([8e5ad12](https://github.com/umatch-oficial/utils/commit/8e5ad12223684a6b5ee7dcef495d9d82cae676e4))

## [1.22.1](https://github.com/umatch-oficial/utils/compare/v1.22.0...v1.22.1) (2023-02-17)


### Bug Fixes

* math.randomInteger() never returns max ([9528523](https://github.com/umatch-oficial/utils/commit/95285230e7d4adc3443d93012c2faa46716d6061))

## [1.22.0](https://github.com/umatch-oficial/utils/compare/v1.21.1...v1.22.0) (2023-02-16)


### Features

* add string.split() ([bded1d0](https://github.com/umatch-oficial/utils/commit/bded1d097dd72c26b6e98bdde4d415215f5eccac))

## [1.21.1](https://github.com/umatch-oficial/utils/compare/v1.21.0...v1.21.1) (2023-02-10)


### Bug Fixes

* export new "time" module ([1ea63dd](https://github.com/umatch-oficial/utils/commit/1ea63dd927f1d83a6cff39aedba81be161482613))

## [1.21.0](https://github.com/umatch-oficial/utils/compare/v1.20.1...v1.21.0) (2023-02-10)


### Features

* add time.sleep() ([2c116b7](https://github.com/umatch-oficial/utils/commit/2c116b7ee48f4ab1a94f99c7ff00bbfa684b322c))

## [1.20.1](https://github.com/umatch-oficial/utils/compare/v1.20.0...v1.20.1) (2023-01-15)


### Bug Fixes

* parameters of string.formatStr() ([56549fd](https://github.com/umatch-oficial/utils/commit/56549fda764cdaa063840575518dbba45d7c5568))

## [1.20.0](https://github.com/umatch-oficial/utils/compare/v1.19.0...v1.20.0) (2023-01-15)


### Features

* add string.pad() ([95745ad](https://github.com/umatch-oficial/utils/commit/95745ad7d62b0e04dddbad0dd59e0a769d3a26f8))

## [1.19.0](https://github.com/umatch-oficial/utils/compare/v1.18.0...v1.19.0) (2023-01-14)


### Features

* add string.formatStr() and string.center() ([e7027e1](https://github.com/umatch-oficial/utils/commit/e7027e169d4cd210a8f3412ca625c7a024e2d9d6))

## [1.18.0](https://github.com/umatch-oficial/utils/compare/v1.17.4...v1.18.0) (2023-01-03)


### Features

* **object:** add stringify() ([6dd1637](https://github.com/umatch-oficial/utils/commit/6dd1637ab4bfd0e5d432e501cca61655536c0bff))

* added commitizen
Commits before this point didn't follow conventional commits guidelines.

## 1.0.0 (2022-09-20)
