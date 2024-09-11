import { Central } from '@lionrockjs/central';
import IdentifierPassword from "../../../../classes/identifier/Password.mjs";

export default {
  databasePath: `${Central.APP_PATH}/../db`,
  userDatabase: 'admin.sqlite',
  databaseMapName: 'admin',
  salt: 'thisislonglonglonglongtextover32bytes',

  destination: '/account',
  requireActivate: false,
  rootRole: 'root',

  databaseMap: new Map([
    ['admin', `${Central.APP_PATH}/../db/admin.sqlite`]
  ]),

  identifiers: [
    IdentifierPassword
  ]
};
