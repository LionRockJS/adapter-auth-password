const { ControllerMixin } = require('@kohanajs/core-mvc');
const { ORM, ControllerMixinDatabase } = require('kohanajs');
const { ControllerMixinMultipartForm } = require('@kohanajs/mod-form');

const { HelperAuth, ControllerMixinAuth }  = require('@kohanajs/mod-auth');

class ControllerMixinAccountPassword extends ControllerMixin {
  static USER = 'accountUser';
  static DATABASE_NAME = ControllerMixinAuth.DATABASE_NAME;
  static IDENTIFIER_DATABASE_NAME = ControllerMixinAuth.IDENTIFIER_DATABASE_NAME;
  static IDENTIFIER = 'accountPasswordIdentifier';

  static init(state) {
    state.set(this.DATABASE_NAME, state.get(this.DATABASE_NAME) || 'admin');
    state.set(this.IDENTIFIER_DATABASE_NAME, state.get(this.IDENTIFIER_DATABASE_NAME) || 'admin');
    state.set(this.IDENTIFIER, state.get(this.IDENTIFIER) || require('../identifier/Password'));
  }

  static async action_change_password_post(state) {
    const $_POST = state.get(ControllerMixinMultipartForm.POST_DATA);

    const { "old-password" : oldPassword, "new-password" : newPassword, "retype-password": retypePassword } = $_POST;
    //check retype password matches
    const Identifier = state.get(this.IDENTIFIER);
    Identifier.matchRetypePassword(newPassword, retypePassword);
    if(newPassword === oldPassword)throw new Error('New password is same as old password');

    const database = state.get(ControllerMixinDatabase.DATABASES).get(state.get(this.IDENTIFIER_DATABASE_NAME));
    const { user_id } = state.get(ControllerMixin.CLIENT).request.session;

    const identifierInstances = await ORM.readBy(Identifier.Model, 'user_id', [user_id], { database , asArray:true});

    //check identifier exist
    if (identifierInstances.length === 0){
      throw new Error('No Password Identifier associate to this user.');
    }

    //verify old password hash;
    identifierInstances.forEach(it =>{
      if (it.hash !== Identifier.hash(user_id, it.name, oldPassword)) throw new Error('Old Password Mismatch');
    })

    //update identifier record
    await Promise.all(identifierInstances.map(async it => {
      it.hash = Identifier.hash(user_id, it.name, newPassword);
      await it.write();
    }));

    await HelperAuth.redirect(state, '/account/password/changed');
  }

  static async action_change_password_done(state) {
    await ControllerMixinAuth.action_logout(state);
  }
}

module.exports = ControllerMixinAccountPassword;
