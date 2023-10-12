import url from "node:url";
const dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
export default {dirname}

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
