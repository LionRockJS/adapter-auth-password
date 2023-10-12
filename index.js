require('kohanajs').addNodeModule(__dirname);

module.exports = {
  ControllerAccountPassword: require('./classes/controller/AccountPassword'),
  ControllerMixinAccountPassword: require('./classes/controller-mixin/AccountPassword'),
  IdentifierPassword: require('./classes/identifier/Password'),
  ModelIdentifierPassword: require('./classes/model/IdentifierPassword'),
};
