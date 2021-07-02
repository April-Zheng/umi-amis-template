import type { StrategyEnum } from '@/types/enum';
import type { AccountTypeEnum } from '@/types/enum';

export interface IBasicResponse {
  Code: number;
  Msg: string;
}

/**
 * 账号信息
 */
export interface IAccount {
  /** 新账号体系ID（值类型同原UserID或CorpID），主键 */
  AccountId: string;
  /** 租户ID，暂无展示位置 */
  AppId: string;
  /** 用户昵称 */
  NickName: string;
  /** 账号类型，1:主账户 2:子账户 */
  Type: AccountTypeEnum;
  /** 用户角色, 0:普通用户 1:CP服务商 10:SP运营商 */
  Role: number;
  /** 用户策略，0:游客 10:个人认证用户 20:企业管理员 21:企业员工 */
  Strategy: StrategyEnum;
  /** 账户的注册类型，0:idle 1:邮箱注册 2:子账户 3:微信注册 4:企业微信注册 */
  RegisterType: number;
  /** 主账户ID（子账户时有效） */
  MasterId: string;
  /** 账户状态，0：未激活 1：已激活 */
  Status: number;
  /** 认证类型，0：个人认证 1：企业认证 */
  AuthType: number;
  /** 认证状态，0：未认证 1：认证中 2：认证通过 3：认证驳回 */
  AuthStatus: number;
  /** 认证单的ID，根据认证类型去不同的表中查询 */
  AuthId: string;
  /** 是否正在修改 (即已认证通过后，再修改认证信息)，0 否，1 是 */
  IsAuthMod: number;
  /** 修改时使用的认证类型 [IsAuthMod = 1时有效] */
  ModAuthType: number;
  /** 修改时的认证单ID，根据认证类型去不同的表中查询 [IsAuthMod = 1时有效] */
  ModAuthId: string;
  /** 邮箱，主账户需要邮箱注册 */
  AccountName: string;
  /** 联系邮箱状态，0：未确认 1：确认中 2: 已确认 */
  ContactMailStatus: number;
  /** 联系邮箱 */
  ContactMail: string;
  /** 联系手机状态，0：未确认 1：确认中 2: 已确认 */
  ContactMobileStatus: number;
  /** 联系手机 */
  ContactMobile: string;
  /** 微信登录openId */
  WxOpenId: string;
  /** 微信登录绑定状态，0：未绑定 1：已绑定 */
  WxBindStatus: number;
  /** 微信昵称 */
  WxNickName: string;
  CorpName?: string;
}
export interface IConfig {
  /** 协议 */
  protocol: string;
  /** 域名 */
  root_domain: string;
  /** sp 域名 */
  sp_host: string;
  /** passport 域名 */
  passport_host: string;
  /** 门户 域名 */
  www_host: string;
  /** console 域名 */
  console_host: string;
  /** 客户经理 域名 */
  customer_host: string;
  [name: string]: any;
}

export interface IMasterStateConfig {
  /** 账号信息 */
  account: IAccount | null;
  /** 局点 */
  area: string | undefined;
  /** 其他配置信息 */
  config: IConfig;
  /** 客户经理信息 */
  manager?: any;
  /** 平台 */
  platform: string;
}

export interface IMasterState {
  _CONSOLE_: IMasterStateConfig;
}

export interface IAccountResponse extends IBasicResponse {
  Account: IAccount;
  Manager?: any;
}

/* 局点配置返回体 */
export interface IAreaConfigResponse extends IBasicResponse {
  area: string;
}

export interface IGlobalConfigResponse extends IBasicResponse, IConfig {}
