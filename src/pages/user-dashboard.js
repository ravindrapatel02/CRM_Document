import React from 'react'

import {  Cell, Pie, PieChart, ResponsiveContainer ,Tooltip} from 'recharts';

const UserDashboard = () => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // const [data, setData] = React.useState({});

    const data =[
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },

    ]

  return (
     <React.Fragment>
     <ResponsiveContainer width='100%' height={300}>
    <PieChart>
      <Pie
        dataKey='value'
        isAnimationActive={false}
        data={data}
        cx='35%'
        cy='50%'
        outerRadius={80}
        fill='#4299E1'
        label
      >
      {data.map((entry, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
      </Pie>
      
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
     </React.Fragment>
  )
}

export default UserDashboard