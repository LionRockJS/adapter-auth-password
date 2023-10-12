const { KohanaJS } = require('kohanajs');
const IdentifierPassword = require("../../../../classes/identifier/Password");

module.exports = {
  databasePath: `${KohanaJS.APP_PATH}/../db`,
  userDatabase: 'admin.sqlite',
  salt: 'thisislonglonglonglongtextover32bytes',

  destination: '/account',
  requireActivate: false,
  rootRole: 'root',

  identifiers: [
    IdentifierPassword
  ]
};
