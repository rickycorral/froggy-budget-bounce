import React from "react";
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
};

export const ExpensePieChart = ({ expenses }) => {
  const data = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((acc, expense) => {
      const category = expense.category === "Transporte" ? "Uber" : expense.category;
      const existingCategory = acc.find((item) => item.name === category);
      if (existingCategory) {
        existingCategory.value += parseFloat(expense.amount);
      } else {
        acc.push({ name: category, value: parseFloat(expense.amount) });
      }
      return acc;
    }, []);

  return (
    <div className="h-64 w-full bg-white bg-opacity-95 rounded-lg shadow-lg p-4 mb-4">
      <h2 className="text-xl font-bold text-center mb-2 text-gray-800">Distribución de Gastos</h2>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || "#cccccc"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 text-xs">
          {data.map((entry, index) => (
            <span key={`legend-${index}`} className="inline-flex items-center mr-2">
              <span className="w-3 h-3 inline-block mr-1" style={{ backgroundColor: categoryColors[entry.name] || "#cccccc" }}></span>
              {entry.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};