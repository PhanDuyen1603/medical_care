import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
  {
    name: '10/2024',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '11/2023',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '12/2023',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '01/2024',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '02/2024',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '03/2024',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '04/2024',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const CharRevenue = ({
  customTooltip = true, color = '#8884d8', showXAxis = false, xAxisKey = 'name', showYAxis, data = chartData
}) => {

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0]?.payload?.[xAxisKey] || 'name'}`}</p>
          <div>
            {payload.map((pld) => (
              <div className="content">
                <div><strong>{pld.dataKey}</strong>: </div>
                <div style={{ color: pld.fill }}>{pld.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width="100%"
        height={400}
        data={data}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* {
          showXAxis && <XAxis dataKey={xAxisKey} />
        } */}
        {/* <XAxis dataKey={xAxisKey} style={{ transform: 'rotate(0)' }} /> */}
        <defs>
          <linearGradient id="colorUv">
            <stop offset="33%" stopColor="#3C87E9" />
            <stop offset="66%" stopColor="#36C1F5" />
            <stop offset="99%" stopColor="#A2CD4E" />
          </linearGradient>
        </defs>
        {
          showYAxis && <YAxis />
        }
        {
          customTooltip && (<Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />)
        }
        {
          !customTooltip && <Tooltip />
        }
        <Area type="monotone" dataKey="uv" strokeWidth={5} stroke="#3C87E9" fillOpacity={0.2} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default CharRevenue;