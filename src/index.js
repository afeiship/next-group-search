import nx from '@jswork/next';

const defaults = {
  allKeys: ['ALL', '', '*'],

  // 以下2个是group为Array的情况下的key
  groupKey: 'groupKey',
  itemsKey: 'items'
};

nx.groupSearch = function (inGroup, inKeyword, inOptions) {
  const options = nx.mix(null, defaults, inOptions);
  const keyword = inKeyword.trim();
  const createFilterFn = (groupKey) => (item, index) => {
    if (options.allKeys.includes(keyword)) return true;
    return options.callback({ item, index, keyword, groupKey });
  };

  if (Array.isArray(inGroup)) {
    return inGroup.map((group) => {
      const items = group[options.itemsKey];
      if (Array.isArray(items)) {
        return {
          ...group,
          [options.itemsKey]: items.filter(createFilterFn(group[options.groupKey]))
        };
      }
      return group;
    });
  } else {
    const result = {};
    nx.forIn(inGroup, (groupKey, items) => {
      if (Array.isArray(items)) {
        result[groupKey] = items.filter(createFilterFn(groupKey));
      }
    });
    return result;
  }
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupSearch;
}

export default nx.groupSearch;
