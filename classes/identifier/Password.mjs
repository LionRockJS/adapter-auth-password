import crypto from 'node:crypto';
import {Central, ORM} from '@lionrockjs/central';
import { Identifier } from '@lionrockjs/mod-auth';

import DefaultModelIdentifierPassword from '../model/IdentifierPassword.mjs';
const ModelIdentifierPassword = await ORM.import('IdentifierPassword', DefaultModelIdentifierPassword);

import argon2 from 'argon2';

export default class IdentifierPassword extends Identifier {
  static Model = ModelIdentifierPassword;

  static isPostDataContainsIdentifierField(postData){
    return !!postData.password;
  }

  static async getName(postData) {
    return postData.username;
  }

  static async registerFilter(identifier, postData) {
    IdentifierPassword.matchRetypePassword(postData.password, postData['retype-password']);

    return {
      hash: await IdentifierPassword.hash(identifier.user_id, identifier.name, postData.password),
    };
  }

  static async loginFilter(identifier, postData, state) {
    const hash = await IdentifierPassword.hash(identifier.user_id, identifier.name, postData.password);
    if (hash.substring(1) !== identifier.hash.substring(1)) throw new Error('Password Mismatch');
    return {};
  }

  static matchRetypePassword(password, retypePassword){
    if(retypePassword === undefined)return;

    if(retypePassword !== password){
      throw new Error('Retype password mismatch');
    }
  }

  static async hash(userId, identifierName, plainTextPassword) {
    const salt = Central.adapter.process().env.AUTH_SALT;
    const digest = await argon2.hash(userId + identifierName + plainTextPassword + salt);
    return `#${digest}`;
  }

  static async verify(hash, userId, identifierName, plainTextPassword){
    const salt = Central.adapter.process().env.AUTH_SALT;
    const text = userId + identifierName + plainTextPassword + salt;
    return await argon2.verify(hash, text);
  }
}
