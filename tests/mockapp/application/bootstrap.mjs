import { Central } from '@lionrockjs/central';

await Central.initConfig(new Map([
  ['auth', await import('./config/auth.mjs')],
  ['register', await import('./config/register.mjs')],
]));