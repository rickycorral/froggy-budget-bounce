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
  Escuela: "#0088FE", // Blue for "Escuela"
  Renta: "#8884d8", // Purple for "Renta"
  Servicios: "#FFBB28", // Yellow for "Servicios"
  Uber: "#000000", // Black for "Uber"
  Comida: "#FF0000", // Red for "Comida"
  Roma: "#FF69B4", // Pink for "Roma"
  Otros: "#8dd1e1", // Indigo for "Otros"
  Medicinas: "#FFA500", // Orange for "Medicinas"
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
        backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                fill={categoryColors[entry.name] || "#cccccc"} // Use category color or fallback to gray
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            wrapperStyle={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
