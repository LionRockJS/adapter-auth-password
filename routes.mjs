import { RouteList } from '@lionrockjs/central';

RouteList.add('/account/password/change', 'controller/AccountPassword');
RouteList.add('/account/password/change', 'controller/AccountPassword', 'change_password_post', 'POST');
RouteList.add('/account/password/changed', 'controller/AccountPassword', 'change_password_done');