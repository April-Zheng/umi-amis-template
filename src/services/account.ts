import { request } from 'umi';
import type { IUserInfo } from '@/types/type';

/** 获取当前的用户 GET /api/currentUser */
export async function queryCurrentUser(options?: Record<string, any>) {
  return request<IUserInfo>('/iam/api/v1/account', {
    method: 'GET',
    ...(options || {}),
  });
}
