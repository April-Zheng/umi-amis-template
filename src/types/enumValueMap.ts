import { AccountAuthStatusEnum, AccountTypeEnum } from './enum';

export const AccountTypeValueMap = {
  /** 账号类型，1:主账户 2:子账户 */
  [AccountTypeEnum.Master]: '主账户',
  [AccountTypeEnum.Slave]: '子账户',
};

export const AccountAuthStatusMap =  {
  /** 认证状态，0：未认证 1：认证中 2：认证通过 3：认证驳回 */
  [AccountAuthStatusEnum.UnAuth]: '未认证',
  [AccountAuthStatusEnum.Authing]: '认证',
  [AccountAuthStatusEnum.Authed]: '认证通过',
  [AccountAuthStatusEnum.AuthReject]: '认证驳回',
}