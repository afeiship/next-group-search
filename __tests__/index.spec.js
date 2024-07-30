require('../src');

describe('api.basic test', () => {
  test('groupSearch should return a list of groups', function () {
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
});
