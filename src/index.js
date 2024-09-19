import nx from '@jswork/next';

const defaults = {
  filters: [],
  relation: 'every',
  callback: ({ item, value, key }) => {
    if (value === 'ALL' || !value) return true;
    const itemValue = nx.get(item, key);
    return itemValue === value;
  }
};

const obj2arr = (obj) => {
  if (!obj || typeof obj !== 'object') return [];
  return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
};

nx.groupSearch = function (inGroup, inOptions) {
  const { filters, relation, callback } = nx.mix(null, defaults, inOptions);
  const calcFilters = Array.isArray(filters) ? filters : obj2arr(filters);
  const result = {};
  nx.forIn(inGroup, (key, value) => {
    if (Array.isArray(value)) {
      result[key] = value.filter((item, index) => {
        if (calcFilters.length === 0) return callback({ item, index });
        return calcFilters[relation]((filter) => callback({ item, index, ...filter }));
      });
    }
  });
  return result;
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupSearch;
}

export default nx.groupSearch;
