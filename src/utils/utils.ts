/* eslint-disable no-underscore-dangle */
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { queryCurrentUser } from '@/services/account';
import { queryGlobalConfig } from '@/services/config';
import type { IMasterStateConfig } from '@/types/type';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

const setWindowConfig = (val: Record<string, unknown>) => {
  // @ts-ignore
  const consoleConf = window._CONSOLE_ || {};
  const config = {
    ...consoleConf,
    ...val,
  };
  // @ts-ignore
  window._CONSOLE_ = config;
};

const getPlatform = () => {
  if (process.env.NODE_ENV === 'development') {
    const paltform = window.location.href.indexOf('console') >= 0 ? 'console' : 'sp';
    setWindowConfig({ paltform });
    return paltform;
  }
  const platform = window.location.host.split('.')[0];
  switch (platform) {
    case 'console':
    case 'cp':
    case 'sp':
    case 'customer':
      setWindowConfig({ platform });
      return platform;
    default:
      setWindowConfig({ platform: 'www' });
      return 'www';
  }
};

// 获取账号信息
const getAccount = async () => {
  try {
    const res = await queryCurrentUser();
    if (res.Code === 0) {
      const { Manager, Account } = res;
      return { Manager, Account };
    }
    return { Manager: null, Account: null };
  } catch (error) {
    return { Manager: null, Account: null };
  }
};

// 通过后端的接口获取局点信息
/**
 * TODO:目前beplant上没有这个接口？404的
 * 不要咯 通过process.env.AREA 获取
 * @returns
 */
// const getArea = async () => {
//   const res = await queryAreaConfig();
//   return res?.env?.name;
// };

// 从cos上获取埋点、微信对接等其他配置信息
const getOtherConfig = async () => {
  const res = await queryGlobalConfig();
  setWindowConfig({ config: res });
  return res;
};

/**
 * 以前的window._CONSOLE_的信息
 * 写一份在window._CONSOLE_适配之前的代码
 * 也存一份在GlobalState 子应用选择性使用
 */
const getBaseConfig = async () => {
  const platform = getPlatform();
  const otherConfig = await getOtherConfig();
  const { Manager, Account } = await getAccount();
  const config: IMasterStateConfig = {
    platform,
    config: otherConfig,
    area: process.env.AREA,
    account: Account,
    manager: Manager,
  };
  setWindowConfig({ config });
  return config;
};

export { getPlatform, getAccount, getBaseConfig };
