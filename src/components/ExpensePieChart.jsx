import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const categoryColors = {
  Escuela: "#0088FE",
  Renta: "#8884d8",
  Servicios: "#FFBB28",
  Uber: "#000000",
  Comida: "#FF0000",
  Roma: "#FF69B4",
  Otros: "#8dd1e1",
  Medicinas: "#FFA500",
  Ahorros: "#00C49F",
};

export const ExpensePieChart = ({ expenses }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = expenses.reduce((acc, expense) => {
    const category = expense.type === "savings" ? "Ahorros" : expense.category;
    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += parseFloat(expense.amount);
    } else {
      acc.push({ name: category, value: parseFloat(expense.amount) });
    }
    return acc;
  }, []);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  };

  return (
    <div className="h-48 w-full bg-white bg-opacity-80 rounded-lg shadow-lg p-2 mb-4">
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={50}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categoryColors[entry.name] || "#cccccc"}
                  opacity={activeIndex === index ? 0.8 : 1}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}
            />
            <Legend 
              formatter={renderColorfulLegendText}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};