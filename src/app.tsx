import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import 'amis/lib/themes/default.css';
import { queryCurrentUser } from '@/services/account';
import type { IAccount, IMasterState } from '@/types/type';
import { setMasterStateConfig } from '@/utils/storage';
import PackageJson from '../package.json';

const loginPath = '/user/login';

export function modifyClientRenderOpts(memo: any) {
  return {
    ...memo,
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    rootElement: window.__POWERED_BY_QIANKUN__ ? PackageJson.name : memo.rootElement,
  };
}

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: IAccount;
  fetchUserInfo?: () => Promise<IAccount | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      notification.error({
        description: '获取用户信息失败',
        message: '错误提示',
      });
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 * 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  if (window.__POWERED_BY_QIANKUN__) {
    // 挂载到乾坤上 不需要layout
    return {
      pure: true,
      waterMarkProps: {
        content: '',
      },
      ...initialState?.settings,
    };
  }
  return {
    pure: false,
    waterMarkProps: {
      content: '',
    },
    ...initialState?.settings,
  };
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log(`${PackageJson.name} bootstrap`, props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log(`${PackageJson.name} mount`, props);
    props.onGlobalStateChange((state: IMasterState, prevState: IMasterState) => {
      console.log('通信状态发生改变：', state, prevState);
      // eslint-disable-next-line no-underscore-dangle
      setMasterStateConfig(state._CONSOLE_);
    }, true);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log(`${PackageJson.name} unmount`, props);
  },
};
