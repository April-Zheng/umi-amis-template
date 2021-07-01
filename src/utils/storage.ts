import type { IMasterStateConfig } from '@/types/type';

const MasterStateConfigKey = 'MasterStateConfig';

/**
 * 设置基座应用发送的全局配置
 * @param config
 */
export const setMasterStateConfig = (config: IMasterStateConfig) => {
  const value = JSON.stringify(config || {});
  localStorage.setItem(MasterStateConfigKey, value);
};

/**
 * 获取基座应用发送的全局配置
 * @param config
 */
 export const getMasterStateConfig = () => {
  const value = localStorage.getItem(MasterStateConfigKey);
  console.log({value})
};