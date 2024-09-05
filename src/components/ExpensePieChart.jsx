import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const ExpensePieChart = ({ expenses }) => {
  const data = expenses
    .filter(expense => expense.type === 'expense')
    .reduce((acc, expense) => {
      const existingCategory = acc.find(item => item.name === expense.category);
      if (existingCategory) {
        existingCategory.value += parseFloat(expense.amount);
      } else {
        acc.push({ name: expense.category, value: parseFloat(expense.amount) });
      }
      return acc;
    }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

  return (
    <div
      className="h-64 w-full"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        width: '90%', // Narrower width
        margin: '0 auto', // Center the chart
        height: '350px', // Reduced height
        marginBottom: '40px', // Space below the chart
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80} // Adjusted radius for better space
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Fix label to show category and percentage
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            wrapperStyle={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              padding: '10px',
              borderRadius: '5px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
