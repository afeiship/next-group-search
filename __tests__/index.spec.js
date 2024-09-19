require('../src');

describe('nx.groupSearch function', () => {
  test('01/group is object, single filter', function () {
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

});
