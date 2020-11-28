const {
  override,
  addExternalBabelPlugin
} = require("customize-cra");


module.exports = override(
  //do stuff with the webpack config...
    addExternalBabelPlugin(["@babel/plugin-proposal-class-properties", { "loose": true }])
)
