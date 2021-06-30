import { renderReactAmis } from '@/utils/amis';
import { PageContainer } from '@ant-design/pro-layout';
import AmisTableListJson from '@/pages/sp/AmisTableList/AmisTableList.json';

export default function AmisTableList() {
  return <PageContainer>{renderReactAmis(AmisTableListJson)}</PageContainer>;
}
