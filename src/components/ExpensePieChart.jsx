import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

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
      const category =
        expense.category === "Transporte" ? "Uber" : expense.category;

      const existingCategory = acc.find((item) => item.name === category);
      if (existingCategory) {
        existingCategory.value += parseFloat(expense.amount);
      } else {
        acc.push({ name: category, value: parseFloat(expense.amount) });
      }
      return acc;
    }, []);

  return (
    <div
      className="h-64 w-full"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px",
        borderRadius: "10px",
        width: "100%",
        margin: "0 auto",
        height: "350px",
        marginBottom: "20px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={categoryColors[entry.name] || "#cccccc"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#333",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};