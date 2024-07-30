import nx from '@jswork/next';
const defaults = { context: global };

nx.groupSearch = function (inOptions) {
  var options = nx.mix(null, defaults, inOptions);
  // package codes...
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupSearch;
}

export default nx.groupSearch;
