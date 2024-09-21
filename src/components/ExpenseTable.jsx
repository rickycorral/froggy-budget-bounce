import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

export const ExpenseTable = ({ filteredExpenses, categoryColors, onDeleteExpense }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
            <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredExpenses.map((expense, index) => (
            <tr key={index} className={`hover:bg-gray-50 ${categoryColors[expense.category] || 'bg-green-100'} bg-opacity-20`}>
              <td className="px-2 py-2 whitespace-nowrap text-xs">{expense.details}</td>
              <td className="px-2 py-2 whitespace-nowrap text-xs">{expense.category || "Ahorros"}</td>
              <td className="px-2 py-2 whitespace-nowrap text-xs">${expense.amount}</td>
              <td className="px-2 py-2 whitespace-nowrap text-xs">{expense.date}</td>
              <td className="px-2 py-2 whitespace-nowrap text-xs">{expense.month}</td>
              <td className="px-2 py-2 whitespace-nowrap text-xs">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  onClick={() => onDeleteExpense(expense)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
