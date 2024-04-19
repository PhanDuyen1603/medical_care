import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, CartesianAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'antd';

const chartData = [
  {
    name: '12-2023',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '01-2024',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '02-2024',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '03-2024',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '04-2024',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
]

const ChartArea = ({
  customTooltip = true, color = '#8884d8', showXAxis = false, xAxisKey = 'name', showYAxis, data = chartData
}) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`name : ${payload[0]?.payload?.[xAxisKey] || 'name'}`}</p>
          <div>
            {payload.map((pld) => (
              <div className="content">
                <div><strong>{pld.dataKey}</strong>: </div>
                <div>{pld.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null
  };

  return (
    <Card>
      <h5 className='mb-5'>Patients Statictics</h5>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <CartesianAxis x={2} width={1} />
          <XAxis dataKey="name" className='custom-x' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="bumpX" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="bumpX" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default ChartArea;