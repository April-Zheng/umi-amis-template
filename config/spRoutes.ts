const basicUrl = '/sp';
const routes = [
  {
    name: 'sp.list.table-list',
    icon: 'table',
    path: '/list',
    component: './sp/TableList',
  },
  {
    name: 'sp.list.amisTable-list',
    icon: 'table',
    path: '/amis-list',
    component: './sp/AmisTableList',
  },
];
const SpRoutes = routes.map((route) => ({ ...route, path: `${basicUrl}${route.path}` }));
export default SpRoutes;
