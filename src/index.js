import nx from '@jswork/next';

const defaults = {
  filters: [],
  callback: ({ item, value, key }) => {
    if (value === 'ALL' || !value) return true;
    const target = nx.get(item, key);
    return target.includes(value);
  }
};

nx.groupSearch = function (inGroup, inOptions) {
  const { filters, callback } = nx.mix(null, defaults, inOptions);
  const result = {};
  nx.forIn(inGroup, (key, value) => {
    if (Array.isArray(value)) {
      result[key] = value.filter((item) => {
        return filters.every((filter) => {
          return callback({ item, ...filter });
        });
      });
    }
  });
  return result;
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupSearch;
}

export default nx.groupSearch;
