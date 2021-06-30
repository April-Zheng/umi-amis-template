/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
const proxyhost = 'http://console.test.beplant.digibms.com'
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
        Cookie: "access_token=Y2U4YZVJNWETMZI2MS0ZOGJILWJIYTUTZTE4ZTM4ZDU2OTU3"
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
