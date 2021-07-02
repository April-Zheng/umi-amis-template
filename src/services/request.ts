// @ts-ignore
// import { request } from "umi";
import { getPassportHost } from '@/utils/host';
import { extend } from 'umi-request';
// import { message } from 'antd';

export const BasicURL = 'http://localhost:8000';

export const CosBasicURL =
  process.env.NODE_ENV === "development"
    ? ""
    : `http://imgcache.t1.t-beplant.bmdigitech.com`;

/**
 * 是否登录态有问题 true 有问题 false 不是登录态问题
 * @param {*} code
 */
 export const isLoginFail = (code: number) => {
  return [9001, 9002, 40003].indexOf(code) !== -1;
};

// @ts-ignore
const errorHandler = (error) => {
  // TODO 和后端状态码对应上
  const codeMap = {
    '021': '发生错误啦',
    '40003': 'access_token不存在',
  };
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status]);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);
  }

  throw error; // 如果throw. 错误将继续抛出.

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
};

const request = extend({
  prefix: BasicURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler,
});

request.interceptors.response.use(async (response: any, options: any) => {
  const data = await response.clone().json();
  console.log({
    response,
    options,
    data,
  });
  // if (data.Code !== 0) {
  //   message.error(data.message || '请求失败，请重试！');
  // }
  if (isLoginFail(data.Code)) {
    getPassportHost();
  }
  return response;
});

export default request;

export { request };
