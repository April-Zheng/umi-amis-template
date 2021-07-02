/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const proxyhost =  `http://sp.test.beplant.digibms.com`;
// const proxyhost =  `http://cosnole.test.beplant.digibms.com`;
const cosProxy = 'http://imgcache.t1.t-beplant.bmdigitech.com';
const sp_access_token = 'OGIXMMZJNTQTZGYWZC0ZYTQ1LTG3NTITZDA1N2I4MTE3ZMI2';

export default {
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/iam/': {
      target: proxyhost,
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        Cookie: `sp_access_token=${sp_access_token}`,
      },
    },
    '/customize': {
      target: cosProxy,
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        Cookie: `sp_access_token=${sp_access_token}`,
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
