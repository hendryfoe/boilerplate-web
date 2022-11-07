import { Card, Image, Typography } from 'antd';
import { useInterval } from 'hooks/use-interval';
import { useState } from 'react';
import { formatDate } from 'utils/date.util';

function DashboardPage() {
  const [datetime, setDatetime] = useState(new Date());

  useInterval(() => {
    setDatetime(new Date());
  }, 1000);

  return (
    <>
      <Card>
        <Typography.Text strong>{formatDate(datetime, 'dd MMM yyyy, HH:mm:ss')}</Typography.Text>
      </Card>
      <br />
      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '680px' }}>
        <Image src={'/images/coming-soon.svg'} preview={false} />
      </Card>
    </>
  );
}

export { DashboardPage };
export default DashboardPage;
