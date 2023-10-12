const { KohanaJS, ORM } = require('kohanajs');
const crypto = require('crypto');

const { Identifier}  = require('@kohanajs/mod-auth');

class IdentifierPassword extends Identifier {
  static Model = ORM.require('IdentifierPassword');

  static isPostDataContainsIdentifierField(postData){
    return !!postData.password;
  }

  static async getName(postData) {
    return postData.username;
  }

  static async registerFilter(identifier, postData) {
    IdentifierPassword.matchRetypePassword(postData.password, postData['retype-password']);

    return {
      hash: IdentifierPassword.hash(identifier.user_id, identifier.name, postData.password),
    };
  }

  static async loginFilter(identifier, postData) {
    const hash = IdentifierPassword.hash(identifier.user_id, identifier.name, postData.password);
    if (hash.substring(1) !== identifier.hash.substring(1)) throw new Error('Password Mismatch');
    return {};
  }

  static matchRetypePassword(password, retypePassword){
    if(retypePassword === undefined)return;

    if(retypePassword !== password){
      throw new Error('Retype password mismatch');
    }
  }

  static hash(userId, identifierName, plainTextPassword) {
    const { salt } = KohanaJS.config.auth;
    const hash = crypto.createHash('sha512');
    hash.update(userId + identifierName + plainTextPassword + salt);
    return `#${hash.digest('hex')}`;
  }
}

module.exports = IdentifierPassword;
