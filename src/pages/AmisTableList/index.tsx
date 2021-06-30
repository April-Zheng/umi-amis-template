import { renderReactAmis } from '@/utils/amis';
import { PageContainer } from '@ant-design/pro-layout';

export default function AmisTableList() {
  return (
    <PageContainer>
      {renderReactAmis({
        type: 'page',
        body: {
          type: 'crud',
          api: 'https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/sample',
          syncLocation: false,
          columns: [
            {
              name: 'id',
              label: 'ID',
            },
            {
              name: 'engine',
              label: 'Rendering engine',
            },
            {
              name: 'browser',
              label: 'Browser',
            },
            {
              name: 'platform',
              label: 'Platform(s)',
            },
            {
              name: 'version',
              label: 'Engine version',
            },
            {
              name: 'grade',
              label: 'CSS grade',
            },
          ],
        },
      })}
    </PageContainer>
  );
}
