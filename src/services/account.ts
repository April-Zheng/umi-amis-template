import type { IAccountResponse, IBasicResponse } from '@/types/type';
import { request } from './request';

/** 退出登录 */
export async function outlogin(options?: Record<string, any>) {
  return request<IBasicResponse>('/iam/api/v1/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 */
export async function queryCurrentUser(options?: Record<string, any>) {
  return request<IAccountResponse>('/iam/api/v1/account', {
    method: 'GET',
    ...(options || {}),
  });
}
