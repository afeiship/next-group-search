require('../src');

describe('nx.groupSearch function', () => {
  test('01/group is object', function () {
    const g1 = {
      restock: [
        { name: 'asparagus', type: 'vegetables', quantity: 5 },
        { name: 'bananas', type: 'fruit', quantity: 0 },
        { name: 'cherries', type: 'fruit', quantity: 5 }
      ],
      ok: [
        { name: 'goat', type: 'meat', quantity: 23 },
        { name: 'fish', type: 'meat', quantity: 22 }
      ]
    };

    const res01 = nx.groupSearch(g1, 'ALL');
    const res02 = nx.groupSearch(g1, '');
    const res03 = nx.groupSearch(g1, '*');
    const res04 = nx.groupSearch(g1, '@', { allKeys: ['@'] });
    const res1 = nx.groupSearch(g1, 'fr', {
      callback: ({ item, keyword }) => {
        return item.type.startsWith(keyword);
      }
    });

    expect(res01).toEqual(g1);
    expect(res02).toEqual(g1);
    expect(res03).toEqual(g1);
    expect(res04).toEqual(g1);
    expect(res1).toEqual({
      restock: [
        { name: 'bananas', type: 'fruit', quantity: 0 },
        { name: 'cherries', type: 'fruit', quantity: 5 }
      ],
      ok: []
    });
  });

  test('02/group is an array', () => {
    const g1 = [
      {
        groupKey: 'restock',
        items: [
          { name: 'asparagus', type: 'vegetables', quantity: 5 },
          { name: 'bananas', type: 'fruit', quantity: 0 },
          { name: 'cherries', type: 'fruit', quantity: 5 }
        ]
      },
      {
        groupKey: 'ok',
        items: [
          { name: 'goat', type: 'meat', quantity: 23 },
          { name: 'fish', type: 'meat', quantity: 22 }
        ]
      }
    ];
    const opts = { itemsKey: 'items', groupKey: 'groupKey' };
    const res01 = nx.groupSearch(g1, 'ALL', opts);
    const res02 = nx.groupSearch(g1, '', opts);
    const res03 = nx.groupSearch(g1, '*', opts);
    const res04 = nx.groupSearch(g1, '@', { allKeys: ['@'], ...opts });
    const res1 = nx.groupSearch(g1, 'meat', {
      ...opts,
      callback: ({ item, keyword }) => {
        return item.type === keyword;
      }
    });

    expect(res01).toEqual(g1);
    expect(res02).toEqual(g1);
    expect(res03).toEqual(g1);
    expect(res04).toEqual(g1);
    expect(res1).toEqual([
      { groupKey: 'restock', items: [] },
      {
        groupKey: 'ok',
        items: [
          { name: 'goat', type: 'meat', quantity: 23 },
          { name: 'fish', type: 'meat', quantity: 22 }
        ]
      }
    ]);
  });
});
