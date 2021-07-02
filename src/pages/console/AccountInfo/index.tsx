import { useModel } from 'umi';
import { Card, Descriptions, Empty } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { AccountAuthStatusMap, AccountTypeValueMap } from '@/types/enumValueMap';

export default function AccountInfo() {
  const { initialState } = useModel('@@initialState');
  const account = initialState?.currentUser;
  if (!account) {
    return (
      <PageContainer>
        <Empty description="获取账号信息失败" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className={styles.accountContainer}>
        <Card title="基本信息" bordered={false}>
          <Descriptions className={styles.left}>
            <Descriptions.Item label="用户名">{account.AccountName}</Descriptions.Item>
            <Descriptions.Item label="账号 ID">{account.AccountId}</Descriptions.Item>
            <Descriptions.Item label="账号类型">
              {AccountTypeValueMap[account.Type]}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions className={styles.right}>
            <Descriptions.Item label="认证状态">
              {AccountAuthStatusMap[account.AuthStatus]}
            </Descriptions.Item>
            <Descriptions.Item label="登录密码">******</Descriptions.Item>
            <Descriptions.Item label="联系手机">{account.ContactMobile}</Descriptions.Item>
            <Descriptions.Item label="联系邮箱">{account.ContactMail}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </PageContainer>
  );
}
