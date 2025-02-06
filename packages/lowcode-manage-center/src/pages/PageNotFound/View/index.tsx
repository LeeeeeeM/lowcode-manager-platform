import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import ViewBox from "/@/components/ViewBox";
import styles from './index.module.less';

export default function PageNotFound() {
  return (
    <ViewBox>
      <div className={styles['page-notfound-box']}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Link to="/">
            <Button type="primary">返回首页</Button>
          </Link>
        }
      />
      </div>
    </ViewBox>
  );
}
