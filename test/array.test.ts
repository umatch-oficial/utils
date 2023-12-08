// noinspection JSUnusedLocalSymbols
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  cartesian,
  deepFlat,
  diff,
  filter,
  filterByObject,
  filterWithComplement,
  findLastIndex,
  formatMatrixToString,
  groupBy,
  hasSameElements,
  intersect,
  isSubset,
  permutations,
  remove,
  shuffle,
  sliceWithOverflow,
  sort,
  transpose,
  trim,
  uniques,
  zip,
} from '../src/array';
import { stringify } from '../src/object';

type Fruit = {
  color: 'green' | 'red' | 'yellow';
  name: string;
  size: number;
  taste?: 'heavenly' | 'sour' | 'sweet' | 'tangy' | 'zesty';
};

const FRUITS: Fruit[] = [
  { name: 'watermelon', size: 3, color: 'green', taste: 'sweet' },
  { name: 'strawberry', size: 1, color: 'red', taste: 'heavenly' },
  { name: 'melon', size: 3, color: 'yellow' },
  { name: 'apple', size: 2, color: 'red', taste: 'sour' },
  { name: 'grape', size: 1, color: 'green' },
  { name: 'banana', size: 2, color: 'yellow' },
];

test('cartesian()', () => {
  expect(cartesian(['a', 'b'] as const, [1, 2] as const, [true]).sort()).toEqual(
    [
      ['a', 1, true],
      ['a', 2, true],
      ['b', 1, true],
      ['b', 2, true],
    ].sort(),
  );
});

test('deepFlat()', () => {
  expect(deepFlat([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
});

describe.each([
  [[1, 2, 3], [2, 3], [1]],
  [[1, 2, 3], [3, 2], [1]],
])('diff()', (a, b, output) => {
  test(`diff([${stringify(a)}], [${stringify(b)}]) = [${stringify(output)}]`, () => {
    expect(diff(a, b).sort()).toEqual(output.sort());
  });
});

test('filter()', async () => {
  expect(await filter([1, 2, 3], (x) => Promise.resolve(x < 2))).toEqual([1]);
});

test('filterByObject()', () => {
  expect(
    filterByObject(
      [
        { a: 1, b: 2 },
        { a: 1, b: 3 },
        { a: 2, b: 3 },
      ],
      { a: 1, b: 3 },
    ),
  ).toEqual([{ a: 1, b: 3 }]);
});

describe('filterWithComplement()', () => {
  test('integers', () => {
    expect(filterWithComplement([1, 2, 3], (x: number) => x < 2)).toEqual([[1], [2, 3]]);
  });
  test('dates', () => {
    expect(
      filterWithComplement(
        [new Date('2022-01-10'), new Date('2022-01-20'), new Date('2022-01-30')],
        (x: Date) => x.getDate() < 10,
      ),
    ).toEqual([
      [new Date('2022-01-10')],
      [new Date('2022-01-20'), new Date('2022-01-30')],
    ]);
  });
});

test('findLastIndex()', () => {
  expect(findLastIndex([1, 2, 2, 1], (x) => x === 2)).toEqual(2);
});

test('formatMatrixToString()', () => {
  expect(
    formatMatrixToString([
      [1, 2, 3],
      [4, 5, 6],
    ]),
  ).toBe(`1 | 2 | 3\n4 | 5 | 6`);
});

describe.each([
  [
    'color',
    {
      green: [
        { name: 'watermelon', size: 3, color: 'green', taste: 'sweet' },
        { name: 'grape', size: 1, color: 'green' },
      ],
      red: [
        { name: 'strawberry', size: 1, color: 'red', taste: 'heavenly' },
        { name: 'apple', size: 2, color: 'red', taste: 'sour' },
      ],
      yellow: [
        { name: 'melon', size: 3, color: 'yellow' },
        { name: 'banana', size: 2, color: 'yellow' },
      ],
    },
  ],
  [
    'size',
    {
      1: [
        { name: 'strawberry', size: 1, color: 'red', taste: 'heavenly' },
        { name: 'grape', size: 1, color: 'green' },
      ],
      2: [
        { name: 'apple', size: 2, color: 'red', taste: 'sour' },
        { name: 'banana', size: 2, color: 'yellow' },
      ],
      3: [
        { name: 'watermelon', size: 3, color: 'green', taste: 'sweet' },
        { name: 'melon', size: 3, color: 'yellow' },
      ],
    },
  ],
] as const)('groupBy()', (key, output) => {
  test(`groupBy(FRUITS, '${key}')`, () => {
    expect(groupBy(FRUITS, key)).toEqual(output);
  });
});

test('groupBy() throws', () => {
  expect(() => {
    const arr = [
      { a: 1, b: 2 },
      { a: 1, b: new Date() },
    ];
    groupBy(arr, 'b');
  }).toThrow('Cannot use value');
});

test('hasSameElements()', () => {
  expect(hasSameElements([1, 2, 3, 3] as const, [3, 3, 2, 1] as const)).toBe(true);
  expect(hasSameElements([1, 2, 3, 3] as const, [3, 2, 1] as const)).toBe(false);
});

describe.each([
  [
    [1, 2, 3],
    [2, 3],
    [2, 3],
  ],
  [
    [1, 2, 3],
    [3, 2],
    [3, 2],
  ],
])('intersect()', (a, b, output) => {
  test(`intersect([${stringify(a)}], [${stringify(b)}]) = [${stringify(output)}]`, () => {
    expect(intersect(a, b).sort()).toEqual(output.sort());
  });
});

test('isSubset()', () => {
  expect(isSubset([1, 2, 3], [3, 2, 1])).toBe(true);
  expect(isSubset([1, 2, 3], [2, 1])).toBe(false);
});

test('permutations()', () => {
  expect(
    permutations(['a', 'b', 'c', 'd'])
      .map((a) => a.join(''))
      .sort(),
  ).toEqual(['ab', 'ac', 'ad', 'bc', 'bd', 'cd'].sort());
});

test('remove()', () => {
  const res = remove(['a', 'b', 'c'], 'a');
  expect(res).toEqual(['b', 'c']);
});

test('shuffle()', () => {
  const arr = [1, 2, 3];
  const n = 100_000;

  const counts = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const shuffled = shuffle(arr);
    const hash = JSON.stringify(shuffled);
    counts.set(hash, (counts.get(hash) ?? 0) + 1);
  }

  counts.forEach((count) => {
    const proportion = count / n;
    expect(proportion).toBeCloseTo(1 / 6);
  });
});

test('sliceWithOverflow()', () => {
  expect(sliceWithOverflow([1, 2, 3], 2, 5)).toEqual([3, 1, 2]);
});

describe('sort()', () => {
  test('single key ascending', () => {
    const fruits = structuredClone(FRUITS);
    const sorted = sort(fruits, [['name', 'asc']]);
    const names = sorted.map((fruit) => fruit.name);
    expect(names).toEqual([
      'apple',
      'banana',
      'grape',
      'melon',
      'strawberry',
      'watermelon',
    ]);
  });

  test('single key descending', () => {
    const fruits = structuredClone(FRUITS);
    const sorted = sort(fruits, [['name', 'desc']]);
    const names = sorted.map((fruit) => fruit.name);
    expect(names).toEqual([
      'watermelon',
      'strawberry',
      'melon',
      'grape',
      'banana',
      'apple',
    ]);
  });

  test('multiple keys', () => {
    const fruits = structuredClone(FRUITS);
    const sorted = sort(fruits, [
      ['color', 'asc'],
      ['size', 'desc'],
    ]);
    const names = sorted.map((fruit) => fruit.name);
    expect(names).toEqual([
      'watermelon',
      'grape',
      'apple',
      'strawberry',
      'melon',
      'banana',
    ]);
  });

  test('with transform function', () => {
    const fruits = structuredClone(FRUITS);
    const sorted = sort(fruits, [['name', 'asc', (name: string) => name.length]]);
    const names = sorted.map((fruit) => fruit.name);
    expect(names).toEqual([
      'melon',
      'apple',
      'grape',
      'banana',
      'watermelon',
      'strawberry',
    ]);
  });

  test('type signature', () => {
    const a = (fruits: Fruit[]) =>
      sort(fruits, [
        ['size', 'asc'],
        ['name', 'desc', (name: string) => name.length],
      ]);
    const b = (fruits: Fruit[]) =>
      sort(fruits, [
        // @ts-expect-error the order must be 'asc' or 'desc'
        ['size', 'ascii'],
        // @ts-expect-error the callback must adhere to the type of the key
        ['name', 'desc', (name: number) => name],
      ]);
  });
});

test('transpose()', () => {
  expect(
    transpose([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]),
  ).toEqual([
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ]);
});

test('trim()', () => {
  expect(trim([null, 'a', null, 'c', null], Boolean)).toEqual(['a', null, 'c']);
});

test('uniques()', () => {
  expect(uniques(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
});

test('zip()', () => {
  expect(zip(['a', 'b', 'c'], [1, 2, 3], [4, 5, 6])).toEqual([
    ['a', 1, 4],
    ['b', 2, 5],
    ['c', 3, 6],
  ]);
});

test('zip() throws', () => {
  expect(() => {
    zip(['a', 'b'], [1, 2, 3]);
  }).toThrow('different lengths');
});
