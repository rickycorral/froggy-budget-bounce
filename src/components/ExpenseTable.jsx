import React from 'react';

export const ExpenseTable = ({ filteredExpenses, categoryColors }) => {
  return (
    <table className="w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {filteredExpenses.map((expense, index) => (
          <tr key={index} className={`hover:bg-gray-50 ${categoryColors[expense.category] || 'bg-green-100'} bg-opacity-20`}>
            <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.details}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.category || "Ahorros"}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm">${expense.amount}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.date}</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.month}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};