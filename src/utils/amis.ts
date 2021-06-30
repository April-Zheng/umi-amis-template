/* eslint-disable no-param-reassign */
import { request } from 'umi';
import { notification } from 'antd';
import { render as renderAmis } from 'amis';
import type { fetcherResult } from '_amis@1.2.0-beta.3@amis/lib/types';

const amisRequest = async (url: string, options: any) => {
  const fetcherRes = await request<fetcherResult>(url, {
    ...options,
  });
  // @ts-ignore
  const res: fetcherResult = { ...fetcherRes, ...fetcherRes.response };
  return res;
};

export const renderReactAmis = (jsonConfig: any) => {
  if (!jsonConfig) {
    return '';
  }
  return renderAmis(
    jsonConfig,
    {
      // props...
      // locale: 'en-US' // 请参考「多语言」的文档
      // scopeRef: (ref: any) => (amisScoped = ref)  // 功能和前面 SDK 的 amisScoped 一样
    },
    {
      // 下面三个接口必须实现
      fetcher: ({
        url, // 接口地址
        method, // 请求方法 get、post、put、delete
        data, // 请求数据
        responseType,
        config, // 其他配置
        headers, // 请求头
      }: any) => {
        config = config || {};
        config.withCredentials = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        responseType && (config.responseType = responseType);

        if (config.cancelExecutor) {
          // config.cancelToken = new (axios as any).CancelToken(
          //   config.cancelExecutor
          // );
        }

        config.headers = headers || {};

        if (method !== 'post' && method !== 'put' && method !== 'patch') {
          if (data) {
            config.params = data;
          }

          return amisRequest(url, {
            method,
            ...config,
          });
          // return (axios as any)[method](url, config);
        }
        if (data && data instanceof FormData) {
          config.headers = config.headers || {};
          config.headers['Content-Type'] = 'multipart/form-data';
        } else if (
          data &&
          typeof data !== 'string' &&
          !(data instanceof Blob) &&
          !(data instanceof ArrayBuffer)
        ) {
          data = JSON.stringify(data);
          config.headers = config.headers || {};
          config.headers['Content-Type'] = 'application/json';
        }

        return amisRequest(url, {
          method,
          ...config,
        });
        // return (axios as any)[method](url, data, config);
      },
      // isCancel: (value: any) => (axios as any).isCancel(value),
      copy: (content) => {
        // copy(content);
        notification.error({
          description: content,
          message: '复制错误 系统方法未实现',
        });
      },
      // 后面这些接口可以不用实现

      // 默认是地址跳转
      // jumpTo: (
      //   location: string /*目标地址*/,
      //   action: any /* action对象*/
      // ) => {
      //   // 用来实现页面跳转, actionType:link、url 都会进来。
      // },

      // updateLocation: (
      //   location: string /*目标地址*/,
      //   replace: boolean /*是replace，还是push？*/
      // ) => {
      //   // 地址替换，跟 jumpTo 类似
      // },

      // isCurrentUrl: (
      //   url: string /*url地址*/,
      // ) => {
      //   // 用来判断是否目标地址当前地址
      // },

      // notify: (
      //   type: 'error' | 'success' /**/,
      //   msg: string /*提示内容*/
      // ) => {
      //   toast[type]
      //     ? toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
      //     : console.warn('[Notify]', type, msg);
      // },
      // alert,
      // confirm,
    },
  );
};
