/* config-overrides.js */
const { injectBabelPlugin } = require("react-app-rewired");
const rewireMobX = require("react-app-rewire-mobx");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function override(config, env) {
  // use the MobX rewire
  config = rewireMobX(config, env);

  // hot-reload
  config = rewireReactHotLoader(config, env);

  return config;
};
