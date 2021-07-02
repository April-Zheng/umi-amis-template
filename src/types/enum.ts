export enum StrategyEnum {
  /** 普通用户 */
  VISITOR = 0,
  /** 个人认证 */
  PERSON = 10,
  /** 企业认证 及 子账户管理员 */
  ENTERPRISE = 20,
  /** 子账号员工 */
  SUB_EMPOLYEE = 21,
}

export enum AccountTypeEnum {
  /** 账号类型，1:主账户 2:子账户 */
  Master = 1,
  Slave = 2,
}

export enum AccountAuthStatusEnum {
  /** 认证状态，0：未认证 1：认证中 2：认证通过 3：认证驳回 */
  UnAuth = 0,
  Authing = 1,
  Authed = 2,
  AuthReject = 3,
}
