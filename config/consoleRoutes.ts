const basicUrl = '/console';
const routes = [
  {
    name: 'console.list.table-list',
    icon: 'table',
    path: '/list',
    component: './sp/TableList',
  },
  {
    name: 'console.list.amisTable-list',
    icon: 'table',
    path: '/amis-list',
    component: './sp/AmisTableList',
  },
];
const ConsoleRoutes = routes.map((route) => ({ ...route, path: `${basicUrl}${route.path}` }));
export default ConsoleRoutes;
