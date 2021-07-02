import type { IAccountResponse } from "@/types/type";
import { StrategyEnum } from "@/types/enum";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: IAccountResponse | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser?.Account?.Role !== StrategyEnum.VISITOR,
  };
}
