import { Flex } from 'antd'
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, YAxis, Text } from 'recharts';

const chartData = [
  { name: "5", value: 4000 },
  { name: "4", value: 2210 },
  { name: "3", value: 2300 },
  { name: "2", value: 1000 },
  { name: "1", value: 0 },
];

const barColors = ["#2EB69E", "#DB7EFD", "#F5C042", "#43C7EF", "#F97410"]

const getYAxisValue = ({ x, y, payload: { value } }) => {
  return (
    <Text x={x - 20} y={y} textAnchor="start" verticalAnchor="middle">
      {`${value} Reviews`}
    </Text>
  );
}

const RatingCount = ({ ratings = null }) => {
  const xKey = "name", yKey = "value"

  return (
    <Flex vertical>
      <ResponsiveContainer width="100%" height={200} debounce={50} className="custom-bar-chart">
        <BarChart layout="vertical" width={150} height={200} data={ratings && ratings.length ? ratings : chartData} >
          <XAxis hide axisLine={false} type="number" />

          <YAxis yAxisId={0} type={'category'} orientation={'left'} dataKey={'name'} axisLine={false} tickLine={false} />
          <YAxis yAxisId={1} type={'category'} orientation={'right'} dataKey={'value'} axisLine={false} tickLine={false} tick={getYAxisValue} />

          <Bar dataKey={yKey} minPointSize={2} barSize={32}>
            {ratings.map((d, idx) => {
              return <Cell key={d[xKey]} fill={barColors[idx]} radius={[10, 10, 10, 10]} height={8} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  )
}

export default RatingCount