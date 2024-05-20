import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const sortPaymentData = (array) => {
  return array.sort((a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  })
}

const SmallChartRevenue = ({ data }) => {
  let paymentData = data && typeof data === 'object' ? data : {};
  if (data) {
    paymentData = sortPaymentData(Object.keys(data).map((key) => ({
      name: key,
      value: data[key],
      cost: data[key],
    })))
  }
  return (
    <>
      <ResponsiveContainer width="100%" height={54}>
        <AreaChart width={200} height={54} data={paymentData}>
          <Area type="monotone" dataKey="cost" stroke="#f09846" fill='#fae6d4' strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}


export default SmallChartRevenue