# next-group-search
> Group search for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
yarn add @jswork/next-group-search
```

## usage
```js
import '@jswork/next-group-search';

const g1 = {
  restock: [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  ok: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
};

const res = nx.groupSearch(g1, "fruit",{
  callback: ({ item }) => {
    return item.quantity > 0;
  }
});

console.log(res);
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-group-search/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-group-search
[version-url]: https://npmjs.org/package/@jswork/next-group-search

[license-image]: https://img.shields.io/npm/l/@jswork/next-group-search
[license-url]: https://github.com/afeiship/next-group-search/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-group-search
[size-url]: https://github.com/afeiship/next-group-search/blob/master/dist/next-group-search.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-group-search
[download-url]: https://www.npmjs.com/package/@jswork/next-group-search
