import type { IAreaConfigResponse, IGlobalConfigResponse } from '@/types/type';
import { CosBasicURL, request } from './request';

/** 获取局点配置信息 */
export async function queryAreaConfig(options?: Record<string, any>) {
  return request<IAreaConfigResponse>('/iam/api/v1/config/getEnvConfig', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 从cos上获取埋点、微信对接等其他配置信息 */
export async function queryGlobalConfig(options?: Record<string, any>) {
  return request<IGlobalConfigResponse>(`${CosBasicURL}/customize/global.json`, {
    method: 'GET',
    ...(options || {}),
  });
}
