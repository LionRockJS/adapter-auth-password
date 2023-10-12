/***
 override ControllerAccount in @kohanajs/mod-auth
 ***/

const { Controller } = require("@kohanajs/core-mvc");
const { ControllerAccount } = require('@kohanajs/mod-auth');
const ControllerMixinAccountPassword = require("../controller-mixin/AccountPassword");

class ControllerAccountPassword extends ControllerAccount {
  static mixins = [...ControllerAccount.mixins, ControllerMixinAccountPassword]

  constructor(request) {
    super(request, {});
  }

  async action_index(){
    this.setTemplate('templates/account/change-password/form', {
      user_full_name: this.request.session.user_meta.full_name,
      user_id: this.request.session.user_id,
      user_role: this.request.session.roles.join(","),
    })
  }

  async action_change_password_post(){

  }

  async action_change_password_done(){
    this.setTemplate('templates/account/change-password/submit')
  }
}

module.exports = ControllerAccountPassword;
