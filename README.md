# utils

Diverse utility functions with great TypeScript types.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Intro](#intro)
*   [array](#array)
*   [csv](#csv)
*   [math](#math)
*   [object](#object)
*   [string](#string)
*   [time](#time)

## Intro

This section is automatically generated from the source code using [documentation.js](https://github.com/documentationjs/documentation). This ensures the documentation is always up-to-date, however, types are simplified or incorrect in many cases and each section has its own table of contents. The last part is a consequence of a hack needed to separate modules into their own sections, otherwise all functions would be listed in one giant section without context.

## array

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [cartesian][1]
    *   [Parameters][2]
*   [deepFlat][3]
    *   [Parameters][4]
*   [diff][5]
    *   [Parameters][6]
*   [filter][7]
    *   [Parameters][8]
*   [filterByObject][9]
    *   [Parameters][10]
*   [filterWithComplement][11]
    *   [Parameters][12]
*   [findLastIndex][13]
    *   [Parameters][14]
*   [formatMatrixToString][15]
    *   [Parameters][16]
*   [groupBy][17]
    *   [Parameters][18]
*   [hasSameElements][19]
    *   [Parameters][20]
*   [intersect][21]
    *   [Parameters][22]
*   [isSubset][23]
    *   [Parameters][24]
*   [joinNonEmpty][25]
    *   [Parameters][26]
*   [permutations][27]
    *   [Parameters][28]
*   [remove][29]
    *   [Parameters][30]
*   [shuffle][31]
    *   [Parameters][32]
*   [sliceWithOverflow][33]
    *   [Parameters][34]
*   [transpose][35]
    *   [Parameters][36]
*   [trim][37]
    *   [Parameters][38]
*   [uniques][39]
    *   [Parameters][40]
*   [zip][41]
    *   [Parameters][42]

## cartesian

Returns the cartesian product of n arrays.

### Parameters

*   `arrays` **...Y**&#x20;

Returns **Cartesian\<Y>**&#x20;

## deepFlat

Array.flat() for n-dimensional arrays.

### Parameters

*   `array` **any**&#x20;

Returns **[Array][43]<(DeepObject\<T> | T)>**&#x20;

## diff

Returns a copy of the first array, without including elements
present in the second array.

### Parameters

*   `a` **X**&#x20;
*   `b` **Y**&#x20;

Returns **any**&#x20;

## filter

Same as Array.filter, but accepts async callbacks.

Uses bluebird.map to limit concurrency.

### Parameters

*   `array` **T**&#x20;
*   `callback` **function (x: any): [Promise][44]<[boolean][45]>**&#x20;
*   `concurrency`   (optional, default `50`)

Returns **[Promise][44]<[Array][43]\<any>>**&#x20;

## filterByObject

Filters an array of objects, ensuring they contain all key:value
pairs in the template.

### Parameters

*   `array` **any**&#x20;
*   `template` **T**&#x20;

Returns **[Array][43]\<any>**&#x20;

## filterWithComplement

Returns the filtered array and the complement as well (elements
removed by the filter).

### Parameters

*   `array` **T**&#x20;
*   `predicate` **P**&#x20;

Returns **any**&#x20;

## findLastIndex

Same as Array.prototype.findIndex, but starting from the end.

Array.prototype.findLastIndex is already available in some runtimes,
but not in Node.

### Parameters

*   `array` **T**&#x20;
*   `predicate` **function (value: any, index: [number][46], arr: [Array][43]\<any>): [boolean][45]**&#x20;

Returns **[number][46]**&#x20;

## formatMatrixToString

Formats a 2D array as a table.

### Parameters

*   `array` **any**&#x20;
*   `center`   (optional, default `true`)
*   `elementSeparator`   (optional, default `' | '`)
*   `lineSeparator`   (optional, default `'\n'`)

Returns **[string][47]**&#x20;

## groupBy

Groups the elements in an array by the value of the specified key.

The key must have a primitive value (boolean, number or string)
for every object in the array. If the value is boolean, it becomes
an index of the resulting object as a string.

### Parameters

*   `array` **T**&#x20;
*   `key` **Key**&#x20;

<!---->

*   Throws **any** if, for any element in the array, the key is not present or has a non-primitive value.

Returns **any**&#x20;

## hasSameElements

Returns whether 2 arrays have the same elements, regardless of order.

### Parameters

*   `a` **A**&#x20;
*   `b` **B**&#x20;

Returns **any**&#x20;

## intersect

Returns the intersection of two arrays.

### Parameters

*   `a` **any**&#x20;
*   `b` **any**&#x20;

Returns **[Array][43]\<X>**&#x20;

## isSubset

Returns whether the small array is a subset of the large array.

### Parameters

*   `small` **any**&#x20;
*   `large` **any**&#x20;

Returns **[boolean][45]**&#x20;

## joinNonEmpty

Joins an array of primitives, filtering out nulls, undefineds and empty strings.

### Parameters

*   `array` **(any | [undefined][48])**&#x20;
*   `separator`   (optional, default `''`)

Returns **[string][47]**&#x20;

## permutations

Returns all length-2 tuples of the elements, in sorted order,
without repeated elements.<br>
(equivalent of python's itertools' combinations)

### Parameters

*   `array` **T**&#x20;

Returns **any**&#x20;

## remove

Removes an item from an array.

### Parameters

*   `array` **T**&#x20;
*   `item` **X**&#x20;

Returns **any**&#x20;

## shuffle

Returns a shuffled copy of the array.

### Parameters

*   `array` **T**&#x20;

Returns **any**&#x20;

## sliceWithOverflow

Same as slice, but overflows to guarantee there are (end - start) elements.

### Parameters

*   `array` **T**&#x20;
*   `start` **[number][46]**&#x20;
*   `end` **[number][46]**&#x20;

Returns **any**&#x20;

## transpose

Returns the transposed array.

### Parameters

*   `array` **any**&#x20;

Returns **[Array][43]<[Array][43]\<T>>**&#x20;

## trim

Returns a copy of the array, where values for which the predicate
is false are removed from both ends.

Similar to filtering the array, except that the elements between
the first and last valid elements are not removed.

### Parameters

*   `array` **T**&#x20;
*   `predicate` **function (value: any, index: [number][46], arr: any): [boolean][45]**&#x20;

Returns **[Array][43]\<any>**&#x20;

## uniques

Returns a copy of an array without duplicates.

### Parameters

*   `array` **T**&#x20;

Returns **any**&#x20;

## zip

Zips arrays. (equivalent of python's zip)

### Parameters

*   `arrays` **...T**&#x20;

<!---->

*   Throws **any** if the arrays don't have the same length.

Returns **Zip\<T>**&#x20;

[1]: #cartesian

[2]: #parameters

[3]: #deepflat

[4]: #parameters-1

[5]: #diff

[6]: #parameters-2

[7]: #filter

[8]: #parameters-3

[9]: #filterbyobject

[10]: #parameters-4

[11]: #filterwithcomplement

[12]: #parameters-5

[13]: #findlastindex

[14]: #parameters-6

[15]: #formatmatrixtostring

[16]: #parameters-7

[17]: #groupby

[18]: #parameters-8

[19]: #hassameelements

[20]: #parameters-9

[21]: #intersect

[22]: #parameters-10

[23]: #issubset

[24]: #parameters-11

[25]: #joinnonempty

[26]: #parameters-12

[27]: #permutations

[28]: #parameters-13

[29]: #remove

[30]: #parameters-14

[31]: #shuffle

[32]: #parameters-15

[33]: #slicewithoverflow

[34]: #parameters-16

[35]: #transpose

[36]: #parameters-17

[37]: #trim

[38]: #parameters-18

[39]: #uniques

[40]: #parameters-19

[41]: #zip

[42]: #parameters-20

[43]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[44]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[45]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[47]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[48]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

## csv

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [CsvOptions][1]
    *   [Properties][2]
*   [safeJoin][3]
    *   [Parameters][4]
*   [shouldProcessRow][5]
    *   [Parameters][6]
*   [titleCaseRows][7]
    *   [Parameters][8]
*   [transformRows][9]
    *   [Parameters][10]
*   [splitFile][11]
    *   [Parameters][12]

## CsvOptions

Type: {encoding: BufferEncoding?, endMessage: [string][13]?, headers: [boolean][14]?, separator: [string][13]?}

### Properties

*   `encoding` **BufferEncoding?** The encoding used to read the input and write the output files
*   `endMessage` **[string][13]?** The message to display when the transformation finishes
*   `headers` **[boolean][14]?** Whether to consider the first row as headers
*   `separator` **[string][13]?** The separator used to read and write files

## safeJoin

Joins strings with the given separator, enclosing them in quotes
if they contain the separator.

### Parameters

*   `parts` **[Array][15]<[string][13]>**&#x20;
*   `separator` **[string][13]**&#x20;
*   `quote` **[string][13]**  (optional, default `'"'`)

Returns **[string][13]**&#x20;

## shouldProcessRow

Returns whether a row's index or header are included in the columns
array. If there isn't one, returns true.

### Parameters

*   `row` **{index: [number][16], header: [string][13]}**&#x20;
*   `columns` **[Array][15]<([string][13] | [number][16])>?**&#x20;

Returns **[boolean][14]**&#x20;

## titleCaseRows

Applies the titleCase function to all rows, then saves to the
output file.

### Parameters

*   `input` **[string][13]** The path to the input file
*   `output` **[string][13]** The path to the output file
*   `options` **{skipWords: [Array][15]<[string][13]>?, columns: [Array][15]<([string][13] | [number][16])>?}?**&#x20;
*   `csvOptions` **[CsvOptions][1]?** Parsing options

## transformRows

Applies the mapValues function to all rows, then saves to the
output file.

### Parameters

*   `input` **[string][13]** The path to the input file
*   `output` **[string][13]** The path to the output file
*   `mapValues` **Exclude\<any, [undefined][17]>**&#x20;
*   `csvOptions` **[CsvOptions][1]?** Parsing options

## splitFile

Splits a file into multiple others.

### Parameters

*   `input` **[string][13]** The path to the input file
*   `outputs` **{: [Array][15]<([string][13] | [number][16])>}**&#x20;
*   `options` **[CsvOptions][1]?** Parsing options

[1]: #csvoptions

[2]: #properties

[3]: #safejoin

[4]: #parameters

[5]: #shouldprocessrow

[6]: #parameters-1

[7]: #titlecaserows

[8]: #parameters-2

[9]: #transformrows

[10]: #parameters-3

[11]: #splitfile

[12]: #parameters-4

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

## math

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [average][1]
    *   [Parameters][2]
*   [diff][3]
    *   [Parameters][4]
    *   [Examples][5]
*   [divmod][6]
    *   [Parameters][7]
*   [limitToRange][8]
    *   [Parameters][9]
*   [maxProperty][10]
    *   [Parameters][11]
*   [nthElement][12]
    *   [Parameters][13]
    *   [Examples][14]
*   [pickRandom][15]
    *   [Parameters][16]
*   [pickWeighted][17]
    *   [Parameters][18]
*   [randomInteger][19]
    *   [Parameters][20]
*   [randomNormal][21]
    *   [Parameters][22]
*   [randomNumber][23]
    *   [Parameters][24]
*   [range][25]
    *   [Parameters][26]
*   [round][27]
    *   [Parameters][28]
*   [sampleNormal][29]
*   [splitInChunks][30]
    *   [Parameters][31]
*   [sum][32]
    *   [Parameters][33]
*   [sumProperty][34]
    *   [Parameters][35]

## average

Returns the average of an array of numbers.

### Parameters

*   `array` **any**&#x20;

Returns **[number][36]**&#x20;

## diff

Returns the difference between each element and the previous in an array.

### Parameters

*   `array` **any**&#x20;

### Examples

```javascript
// returns [2,4,3]
diff([1,3,7,10])
```

Returns **[Array][37]<[number][36]>**&#x20;

## divmod

Returns the quotient and remainder of x/y.

### Parameters

*   `x` **[number][36]**&#x20;
*   `y` **[number][36]**&#x20;

Returns **\[[number][36], [number][36]]**&#x20;

## limitToRange

Returns the number or min/max if it is below/above the thresholds, respectively.

### Parameters

*   `num` **[number][36]**&#x20;
*   `lower` **[number][36]**&#x20;
*   `upper` **[number][36]**&#x20;

Returns **[number][36]**&#x20;

## maxProperty

Returns the maximum value of the given property of the elements in the array.

### Parameters

*   `array` **any**&#x20;
*   `property` **Prop**&#x20;

Returns **[number][36]**&#x20;

## nthElement

Returns the nth element with overflow.

### Parameters

*   `array` **T**&#x20;
*   `n` **[number][36]**&#x20;

### Examples

```javascript
// returns 1
nthElement([0,1,2,3], 5)
```

Returns **any**&#x20;

## pickRandom

Picks a random option from an array, with equal weights.

### Parameters

*   `options` **T**&#x20;

Returns **any**&#x20;

## pickWeighted

Picks a random option from an array of { option, weight }.

### Parameters

*   `options` **any**&#x20;

Returns **any**&#x20;

## randomInteger

Returns a random integer between min and max.

If no values are passed, uses 0 and 1.
If only 1 valued is passed, uses 0 and value.

### Parameters

*   `min` **[number][36]?**&#x20;
*   `max` **[number][36]?**&#x20;

Returns **[number][36]**&#x20;

## randomNormal

Returns a random number from the normal distribution between min and max.

### Parameters

*   `min` **[number][36]**&#x20;
*   `max` **[number][36]**&#x20;
*   `mean` **[number][36]?**&#x20;

Returns **[number][36]**&#x20;

## randomNumber

Returns a random number between min and max.

If no values are passed, uses 0 and 1.<br>
If only 1 valued is passed, uses 0 and value.

### Parameters

*   `min` **[number][36]?**&#x20;
*   `max` **[number][36]?**&#x20;

Returns **[number][36]**&#x20;

## range

Returns a list of integers from *start* to *end*.
(similar to python's range)

If only 1 value is passed, uses \[0, start\[.<br>
If 2 values are passed, uses \[start, end\[.

### Parameters

*   `start` **[number][36]**&#x20;
*   `end` **[number][36]?**&#x20;

Returns **[Array][37]<[number][36]>**&#x20;

## round

Returns the number rounded to the specified amount of digits.

See [https://stackoverflow.com/a/48764436][38] solution #2 for an
in-depth explanation.

### Parameters

*   `number` **[number][36]**&#x20;
*   `digits` **[number][36]**  (optional, default `1`)

Returns **[number][36]**&#x20;

## sampleNormal

Returns a random number from the normal distribution.

Returns **[number][36]**&#x20;

## splitInChunks

Splits an array into chunks of equal size.

### Parameters

*   `array` **T**&#x20;
*   `size` **[number][36]**&#x20;

Returns **[Array][37]<[Array][37]\<any>>**&#x20;

## sum

Returns the sum of the elements in the array.

### Parameters

*   `array` **any**&#x20;

Returns **[number][36]**&#x20;

## sumProperty

Returns the sum of the given property of the elements in the array.

### Parameters

*   `array` **any**&#x20;
*   `property` **any**&#x20;

Returns **[number][36]**&#x20;

[1]: #average

[2]: #parameters

[3]: #diff

[4]: #parameters-1

[5]: #examples

[6]: #divmod

[7]: #parameters-2

[8]: #limittorange

[9]: #parameters-3

[10]: #maxproperty

[11]: #parameters-4

[12]: #nthelement

[13]: #parameters-5

[14]: #examples-1

[15]: #pickrandom

[16]: #parameters-6

[17]: #pickweighted

[18]: #parameters-7

[19]: #randominteger

[20]: #parameters-8

[21]: #randomnormal

[22]: #parameters-9

[23]: #randomnumber

[24]: #parameters-10

[25]: #range

[26]: #parameters-11

[27]: #round

[28]: #parameters-12

[29]: #samplenormal

[30]: #splitinchunks

[31]: #parameters-13

[32]: #sum

[33]: #parameters-14

[34]: #sumproperty

[35]: #parameters-15

[36]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[37]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[38]: https://stackoverflow.com/a/48764436

## object

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [apply][1]
    *   [Parameters][2]
*   [camelCaseKeys][3]
    *   [Parameters][4]
*   [deepClone][5]
    *   [Parameters][6]
*   [deepMap][7]
    *   [Parameters][8]
*   [extract][9]
    *   [Parameters][10]
*   [getDeepProperty][11]
    *   [Parameters][12]
    *   [Examples][13]
*   [hasOwnProperty][14]
    *   [Parameters][15]
*   [isDeepEmpty][16]
    *   [Parameters][17]
*   [merge][18]
    *   [Parameters][19]
*   [omit][20]
    *   [Parameters][21]
*   [pick][22]
    *   [Parameters][23]
*   [rename][24]
    *   [Parameters][25]
*   [setDeepProperty][26]
    *   [Parameters][27]
    *   [Examples][28]
*   [snakeCaseKeys][29]
    *   [Parameters][30]
*   [stringify][31]
    *   [Parameters][32]

## apply

Copies an object and applies a function to all values. If keys is
specified, only applies the function to those keys.

### Parameters

*   `obj` **T**&#x20;
*   `func` **function (val: [ValueOf][33]\<T>): R**&#x20;
*   `keys` **Keys?**&#x20;

Returns **any**&#x20;

## camelCaseKeys

Renames all keys to camel case.

### Parameters

*   `obj` **T**&#x20;

Returns **SnakeToCamelCaseKeys\<T>**&#x20;

## deepClone

Returns a deep clone of the object.

Similar to structuredClone, except that it only treats plain
objects and arrays as values, and copies all other types by
reference.

### Parameters

*   `obj` **T**&#x20;

Returns **T**&#x20;

## deepMap

Maps the function over deeply nested elements of the object,
which are not arrays.

### Parameters

*   `x` **T**&#x20;
*   `f` **function (val: any): any**&#x20;

Returns **T**&#x20;

## extract

Dynamic version of pick.

Returns two copies of an object: one containing only the keys that
match the rule, and another one containing the keys that don't
match. The rule can be a pattern (prefix, suffix or custom regular
expression), a list of keys, a function to filter keys, or a
function to filter values. If the rule is a prefix or suffix,
removes the prefix/suffix from the matched keys (can be turned off
with the rename option).

### Parameters

*   `obj` **T**&#x20;
*   `options` **Options**&#x20;

Returns **any**&#x20;

## getDeepProperty

Returns a deep property of an object given a path-like string.

### Parameters

*   `obj` **(Dictionary | any)**&#x20;
*   `str` **[string][34]**&#x20;
*   `sep`   (optional, default `'.'`)

### Examples

```javascript
// returns 9
getDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]')
```

Returns **(any | [undefined][35])**&#x20;

## hasOwnProperty

Checks if a prop exists in obj and tells TypeScript that obj has this prop.

### Parameters

*   `obj` **X**&#x20;
*   `prop` **Y**&#x20;

Returns **any**&#x20;

## isDeepEmpty

Returns whether the object is deep empty.

A deep empty object only has values that are empty strings, empty
arrays, empty objects or deep empty objects.

### Parameters

*   `obj` **Dictionary\<any>**&#x20;

Returns **[boolean][36]**&#x20;

## merge

Deep merges two objects.

Values from the second object override those in the first one,
except when both objects hold an array on the same key and the
strategy is set to "concat", in which case both arrays are merged.

### Parameters

*   `target` **A**&#x20;
*   `source` **B**&#x20;
*   `strategy` **(`"override"` | `"concat"`)?**&#x20;

<!---->

*   Throws **any** if an unexpected strategy is provided.

Returns **any**&#x20;

## omit

Copies an object excluding some keys.

### Parameters

*   `obj` **T**&#x20;
*   `keys` **any**&#x20;

Returns **Omit\<T, K>**&#x20;

## pick

Copies an object using some keys.

Makes a copy of an object using only the given keys. If an entry is
not present, it receives the value of undefined.

### Parameters

*   `obj` **T**&#x20;
*   `keys` **any**&#x20;

Returns **Pick\<T, K>**&#x20;

## rename

Returns a copy of an object, with renamed first-level keys.

### Parameters

*   `obj` **T**&#x20;
*   `mapper` **Mapper**&#x20;

Returns **any**&#x20;

## setDeepProperty

Sets a deep property of an object given a path-like string.

### Parameters

*   `obj` **(Dictionary | any)**&#x20;
*   `str` **[string][34]**&#x20;
*   `value` **any**&#x20;
*   `sep`   (optional, default `'.'`)

### Examples

```javascript
// returns { a: { b: [2,3,5] } }
setDeepProperty({ a: { b: [2,3,9] } }, 'a.b[2]', 5)
```

*   Throws **any** if some object in the path is an array, but the next key is not a number.

Returns **any**&#x20;

## snakeCaseKeys

Renames all keys to snake case.

### Parameters

*   `obj` **T**&#x20;

Returns **CamelToSnakeCaseKeys\<T>**&#x20;

## stringify

Similar to JSON.stringify(), but optionally pads entries between
the key and value to make all lines have the same width.

### Parameters

*   `obj` **(Dictionary | any | any)**&#x20;
*   `options` **{indent: [number][37]?, pad: [boolean][36]?, doubleQuotes: [boolean][36]?}?**&#x20;

    *   `options.indent` **[number][37]** The size of the indent. Default: 2 (optional, default `2`)
    *   `options.pad` **[boolean][36]** Whether to pad entries. Default: false (optional, default `false`)
    *   `options.doubleQuotes` **[boolean][36]** Use double quotes. Default: true (optional, default `true`)
*   `inheritedIndent` **[string][34]** Used to keep track of the current indent during recursion (optional, default `""`)

Returns **[string][34]**&#x20;

[1]: #apply

[2]: #parameters

[3]: #camelcasekeys

[4]: #parameters-1

[5]: #deepclone

[6]: #parameters-2

[7]: #deepmap

[8]: #parameters-3

[9]: #extract

[10]: #parameters-4

[11]: #getdeepproperty

[12]: #parameters-5

[13]: #examples

[14]: #hasownproperty

[15]: #parameters-6

[16]: #isdeepempty

[17]: #parameters-7

[18]: #merge

[19]: #parameters-8

[20]: #omit

[21]: #parameters-9

[22]: #pick

[23]: #parameters-10

[24]: #rename

[25]: #parameters-11

[26]: #setdeepproperty

[27]: #parameters-12

[28]: #examples-1

[29]: #snakecasekeys

[30]: #parameters-13

[31]: #stringify

[32]: #parameters-14

[33]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf

[34]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[35]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

[36]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[37]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

## string

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Replace][1]
*   [basicPluralizer][2]
    *   [Parameters][3]
    *   [Examples][4]
*   [center][5]
    *   [Parameters][6]
*   [formatStr][7]
    *   [Parameters][8]
*   [formatTime][9]
    *   [Parameters][10]
    *   [Examples][11]
*   [getCountDown][12]
    *   [Parameters][13]
    *   [Examples][14]
*   [join][15]
    *   [Parameters][16]
*   [joinUrl][17]
    *   [Parameters][18]
    *   [Examples][19]
*   [pad][20]
    *   [Parameters][21]
*   [parseBool][22]
    *   [Parameters][23]
*   [parseFunctionCall][24]
    *   [Parameters][25]
    *   [Examples][26]
*   [parseNumber][27]
    *   [Parameters][28]
*   [removeAccents][29]
    *   [Parameters][30]
*   [rsplit][31]
    *   [Parameters][32]
    *   [Examples][33]
*   [split][34]
    *   [Parameters][35]
    *   [Examples][36]
*   [capitalize][37]
    *   [Parameters][38]
*   [uncapitalize][39]
    *   [Parameters][40]
*   [toCase][41]
    *   [Parameters][42]
*   [camelCase][43]
*   [pascalCase][44]
*   [sentenceCase][45]
    *   [Parameters][46]
*   [snakeCase][47]
*   [titleCase][48]
    *   [Parameters][49]

## Replace

Replaces NewChar with Char in S.

Type: any

## basicPluralizer

Pluralizes the word if *quantity* is undefined, 0 or
greater than 1. Uses the given plural or adds an 's' to the end.

### Parameters

*   `word` **[string][50]**&#x20;
*   `quantity` **[number][51]?**&#x20;
*   `plural` **[string][50]?**&#x20;

### Examples

```javascript
// returns 'developers'
basicPluralizer('developer')
// returns 'developer'
basicPluralizer('developer', 1)
// returns 'developers'
basicPluralizer('developer', 2)
```

Returns **[string][50]**&#x20;

## center

Pads a string on both sides to achieve the desired length.

If the number of spaces to add is uneven, the left side gets the
extra space.

### Parameters

*   `str` **[string][50]**&#x20;
*   `length` **[number][51]**&#x20;
*   `character`   (optional, default `' '`)

Returns **[string][50]**&#x20;

## formatStr

Formats a string according to options.

### Parameters

*   `str` **[string][50]**  (optional, default `''`)
*   `options` **{bgColor: ChalkColor?, bold: [boolean][52]?, color: ChalkColor?, length: [number][51]?}**  (optional, default `{}`)

    *   `options.bold`  Whether to make it bold
    *   `options.bgColor`  Background color
    *   `options.color`  Text color
    *   `options.length`  Pad string on both sides up to this length

Returns **[string][50]**&#x20;

## formatTime

Formats the duration-like object, using up to the specified number
of parts starting from the largest non-zero unit. Values are
converted into larger units, so that 70 seconds becomes 1 minute
and 10 seconds, for example.

### Parameters

*   `time` **{hours: [number][51]?, minutes: [number][51]?, seconds: [number][51]?, milliseconds: [number][51]?}** Duration-like object
*   `options` **{dictionary: {and: [string][50], hour: [string][50], minute: [string][50], second: [string][50], millisecond: [string][50]}?, parts: [number][51]?, pluralizer: Pluralizer?, short: [boolean][52]?}?**&#x20;

    *   `options.dictionary`  Words to substitute. Default: english words
    *   `options.parts`  The number of parts to include in the output. Default: 2
    *   `options.pluralizer`  A pluralizer function. Default: adds 's' to the end the word

### Examples

```javascript
// returns "10 minutes and 5 seconds"
formatTime(
    { hours: 0, minutes: 10, seconds: 5, milliseconds: 300 },
    { parts: 2 },
)
```

Returns **[string][50]**&#x20;

## getCountDown

Returns a human-readable count-down until a certain date.

Starts from the largest unit of time (default: day) to the
smallest (default: minute). Returns the count-down in the
first unit for which the difference from date until now
exceeds the threshold for the unit (default: 1).

### Parameters

*   `date` **([string][50] | DateTime)** If date is a string, it is parsed with DateTime.fromISO(string, { setZone: true }).
*   `options` **{dictionary: DateTimeDict?, pluralizer: Pluralizer?, short: [boolean][52]?, unitsThresholds: any?}?**&#x20;

    *   `options.dictionary`  Words to substitute. Default: english words
    *   `options.pluralizer`  A pluralizer function. Default: adds 's' to the end the word
    *   `options.short`  Whether to shorten the duration identifier (pick first letter)
    *   `options.unitsThresholds`  Threshold per unit

### Examples

```javascript
const date = DateTime.now().plus({ days: 3 });
// returns '3 days'
getCountDown(date);
// returns '3d'
getCountDown(date, { short: true });
// returns '72 hours'
getCountDown(date, { unitsThresholds: [['day', 5], ['hour', 1]] });
```

*   Throws **any** if the given dictionary doesn't have entries for all possible units.

Returns **[string][50]**&#x20;

## join

Joins words as in a sentence.

### Parameters

*   `parts` **any**&#x20;
*   `and`   (optional, default `'&'`)

Returns **[string][50]**&#x20;

## joinUrl

Joins parts of a URL with '/'.

Removes / from the beginning and end of each part before joining.

### Parameters

*   `parts` **...any**&#x20;

### Examples

```javascript
// returns 'https://abc.com/example'
joinUrl('https://abc.com/', 'example/')
```

Returns **[string][50]**&#x20;

## pad

Inserts spaces between left and right to achieve the desired length.

### Parameters

*   `left` **[string][50]**&#x20;
*   `right` **[string][50]**&#x20;
*   `length` **[number][51]**&#x20;

## parseBool

Parses a boolean from the string.

### Parameters

*   `str` **([string][50] | null | [undefined][53])**&#x20;
*   `def` **[boolean][52]?**&#x20;

<!---->

*   Throws **any** if it fails to parse and there is no default value.

Returns **[boolean][52]**&#x20;

## parseFunctionCall

Returns a function name and its arguments from a string. Boolean
and number arguments are parsed. If the function call is not
valid, returns an empty string and an empty array.

### Parameters

*   `str` **[string][50]**&#x20;

### Examples

```javascript
parseFunctionCall("foo(1, 'bar', true)") // returns ["foo", [1, "bar", true]]
parseFunctionCall("foo(1, 'bar', true) + 1") // returns ["", []]
```

Returns **\[[string][50], [Array][54]\<Primitive>]**&#x20;

## parseNumber

Parses a number from the string.

### Parameters

*   `str` **([string][50] | null | [undefined][53])**&#x20;
*   `def` **[number][51]?**&#x20;

<!---->

*   Throws **any** if it fails to parse and there is no default value.

Returns **[number][51]**&#x20;

## removeAccents

Replaces accented letters with their standard versions.

### Parameters

*   `str` **[string][50]**&#x20;

Returns **[string][50]**&#x20;

## rsplit

Splits a string starting from the right, stops after n splits.
(equivalent of python's rsplit)

### Parameters

*   `str` **([string][50] | null | [undefined][53])**&#x20;
*   `n`  number of splits (optional, default `-1`)
*   `sep`  separator (optional, default `','`)

### Examples

```javascript
// returns ["a", "b", "c"]
rsplit("a,b,c")
// returns ["a,b", "c"]
rsplit("a,b,c", 1)
```

Returns **[Array][54]<[string][50]>**&#x20;

## split

Splits a string starting from the left, stops after n splits.
(equivalent of python's split)

### Parameters

*   `str` **([string][50] | null | [undefined][53])**&#x20;
*   `n`  number of splits (optional, default `-1`)
*   `sep`  separator (optional, default `','`)

### Examples

```javascript
// returns ["a", "b", "c"]
split("a,b,c")
// returns ["a", "b,c"]
split("a,b,c", 1)
```

Returns **[Array][54]<[string][50]>**&#x20;

## capitalize

Converts the first character of a string to uppercase.

### Parameters

*   `str` **S**&#x20;

Returns **Capitalize\<S>**&#x20;

## uncapitalize

Converts the first character of a string to lowercase.

### Parameters

*   `str` **S**&#x20;

Returns **Uncapitalize\<S>**&#x20;

## toCase

Returns a function, which changes the case of a string.

*Warning*: keeps only letters and numbers, all punctuation is lost,
so it should only be used on strings that are supposed to form a
single word.

### Parameters

*   `firstWordFunction` **function (str: [string][50]): [string][50]**&#x20;
*   `otherWordsFunction` **function (str: [string][50]): [string][50]**&#x20;
*   `separator` **[string][50]**&#x20;

Returns **function (str: [string][50]): [string][50]**&#x20;

## camelCase

Converts a string to camelCase.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

Type: function (str: [string][50]): [string][50]

## pascalCase

Converts a string to camelCase.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

Type: function (str: [string][50]): [string][50]

## sentenceCase

Converts a string to Sentence case.

### Parameters

*   `str` **[string][50]**&#x20;

## snakeCase

Converts a string to snake\_case.

*Warning*: the whole string is considered as one, so if you want to
apply the function to parts of a string individually, you must
split it and map the function over each unit according to your needs.

Type: function (str: [string][50]): [string][50]

## titleCase

Converts a string to Title Case.

Some words should not be capitalized, depending on the language.

### Parameters

*   `str` **[string][50]**&#x20;
*   `skipWords` **[Array][54]<[string][50]>?** Words to skip. Default: english skip words (articles, prepositions, etc.) (optional, default `ENGLISH_SKIP_WORDS`)

Returns **[string][50]**&#x20;

[1]: #replace

[2]: #basicpluralizer

[3]: #parameters

[4]: #examples

[5]: #center

[6]: #parameters-1

[7]: #formatstr

[8]: #parameters-2

[9]: #formattime

[10]: #parameters-3

[11]: #examples-1

[12]: #getcountdown

[13]: #parameters-4

[14]: #examples-2

[15]: #join

[16]: #parameters-5

[17]: #joinurl

[18]: #parameters-6

[19]: #examples-3

[20]: #pad

[21]: #parameters-7

[22]: #parsebool

[23]: #parameters-8

[24]: #parsefunctioncall

[25]: #parameters-9

[26]: #examples-4

[27]: #parsenumber

[28]: #parameters-10

[29]: #removeaccents

[30]: #parameters-11

[31]: #rsplit

[32]: #parameters-12

[33]: #examples-5

[34]: #split

[35]: #parameters-13

[36]: #examples-6

[37]: #capitalize

[38]: #parameters-14

[39]: #uncapitalize

[40]: #parameters-15

[41]: #tocase

[42]: #parameters-16

[43]: #camelcase

[44]: #pascalcase

[45]: #sentencecase

[46]: #parameters-17

[47]: #snakecase

[48]: #titlecase

[49]: #parameters-18

[50]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[51]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[52]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[53]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

[54]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

## time

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [sleep][1]
    *   [Parameters][2]

## sleep

Sleep for a given duration.

### Parameters

*   `duration` **DurationLike**&#x20;

Returns **[Promise][3]\<void>**&#x20;

[1]: #sleep

[2]: #parameters

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
