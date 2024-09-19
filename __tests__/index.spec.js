require('../src');

describe('nx.groupSearch function', () => {
  test('01/group is object, single filter', () => {
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

    const res1 = nx.groupSearch(g1, {
      relation: 'every',
      filters: [{ key: 'type', value: 'fruit' }],
      callback: ({ item }) => item.quantity > 0 && item.type === 'fruit'
    });

    expect(res1).toEqual({
      restock: [
        {
          name: 'cherries',
          type: 'fruit',
          quantity: 5
        }
      ],
      ok: []
    });
  });

  test('02/group is object, empty filter but has keywords', () => {
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

    const res1 = nx.groupSearch(g1, {
      callback: ({ item }) => item.name.includes('as')
    });

    expect(res1).toEqual({
      restock: [
        { name: 'asparagus', type: 'vegetables', quantity: 5 },
        { name: 'bananas', type: 'fruit', quantity: 0 }
      ],
      ok: []
    });
  });

  test('03/group is object, multiple filter', () => {
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

    const res1 = nx.groupSearch(g1, {
      relation: 'some',
      filters: [
        { key: 'type', value: 'fruit' },
        { key: 'quantity', value: 5 }
      ],
      callback: ({ item, key, value }) => {
        const itemValue = nx.get(item, key);
        return itemValue === value;
      }
    });

    expect(res1).toEqual({
      restock: [
        { name: 'asparagus', type: 'vegetables', quantity: 5 },
        { name: 'bananas', type: 'fruit', quantity: 0 },
        { name: 'cherries', type: 'fruit', quantity: 5 }
      ],
      ok: []
    });

    const res2 = nx.groupSearch(g1, {
      relation: 'every',
      filters: [
        { key: 'type', value: 'fruit' },
        { key: 'quantity', value: 5 }
      ],
      callback: ({ item, key, value }) => {
        const itemValue = nx.get(item, key);
        return itemValue === value;
      }
    });

    expect(res2).toEqual({
      restock: [{ name: 'cherries', type: 'fruit', quantity: 5 }],
      ok: []
    });
  });

  test('04/filter is object, multiple filter', () => {
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

    const res1 = nx.groupSearch(g1, {
      filters: {
        type: 'fruit',
        quantity: 5
      },
      callback: ({ item, key, value }) => {
        const itemValue = nx.get(item, key);
        return itemValue === value;
      }
    });

    expect(res1).toEqual({
      restock: [{ name: 'cherries', type: 'fruit', quantity: 5 }],
      ok: []
    });
  });

  test('05/default callback', () => {
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

    const res1 = nx.groupSearch(g1, {
      filters: {
        type: 'fruit',
        quantity: 5
      }
    });

    expect(res1).toEqual({
      restock: [{ name: 'cherries', type: 'fruit', quantity: 5 }],
      ok: []
    });
  });
});
