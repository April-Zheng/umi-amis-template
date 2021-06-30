import SpRoutes from './spRoutes';
import ConsoleRoutes from './consoleRoutes';

export default [
  ...SpRoutes,
  ...ConsoleRoutes,
  {
    component: './404',
  },
];
