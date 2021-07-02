import type { IAccountResponse } from '@/types/type';
import { request } from './request';

/** 获取当前的用户 GET /api/currentUser */
export async function queryCurrentUser(options?: Record<string, any>) {
  return request<IAccountResponse>('/iam/api/v1/account', {
    method: 'GET',
    ...(options || {}),
  });
}
