export default {
  filename: import.meta.url,
  configs: ['auth']
}

import ControllerAccountPassword from './classes/controller/AccountPassword.mjs';
import ControllerMixinAccountPassword from './classes/controller-mixin/AccountPassword.mjs';
import IdentifierPassword from './classes/identifier/Password.mjs';
import ModelIdentifierPassword from './classes/model/IdentifierPassword.mjs';

export {
  ControllerAccountPassword,
  ControllerMixinAccountPassword,
  IdentifierPassword,
  ModelIdentifierPassword,
};
