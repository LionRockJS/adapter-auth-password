const {ORM} = require('kohanajs');

class IdentifierPassword extends ORM{
  user_id = null;
  name = null;
  hash = null;

  static joinTablePrefix = 'identifier_password';
  static tableName = 'identifier_passwords';

  static fields = new Map([
    ["name", "String!"],
    ["hash", "String!"]
  ]);
  static belongsTo = new Map([
    ["user_id", "User"]
  ]);
}

module.exports = IdentifierPassword;
