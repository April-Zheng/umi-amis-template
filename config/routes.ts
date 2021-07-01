import SpRoutes from './spRoutes';
import ConsoleRoutes from './consoleRoutes';

export default [
  {
    name: 'sp.list.table-list',
    icon: 'table',
    path: '/',
    component: './sp/TableList',
  },
  ...SpRoutes,
  ...ConsoleRoutes,
  {
    component: './404',
  },
];
