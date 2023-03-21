# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

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