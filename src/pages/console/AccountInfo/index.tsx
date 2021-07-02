import { useModel } from 'umi';
import { Card, Descriptions, Empty } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { AccountAuthStatusMap, AccountTypeValueMap } from '@/types/enumValueMap';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.less';

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
      <Card title="基本信息" bordered={false}>
        <div className={styles.accountContainer}>
          <div className={styles.left}>
            <Descriptions>
              <Descriptions.Item label="用户名">
                {account.AccountName} <EditOutlined />
              </Descriptions.Item>
              <Descriptions.Item label="账号 ID">{account.AccountId}</Descriptions.Item>
              <Descriptions.Item label="账号类型">
                {AccountTypeValueMap[account.Type]}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className={styles.right}>
            <Descriptions>
              <Descriptions.Item label="认证状态">
                {AccountAuthStatusMap[account.AuthStatus]}
              </Descriptions.Item>
              <Descriptions.Item label="登录密码">******</Descriptions.Item>
              <Descriptions.Item label="联系手机">{account.ContactMobile}</Descriptions.Item>
              <Descriptions.Item label="联系邮箱">{account.ContactMail}</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
