import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const IncomeHistory = ({ incomeHistory, onEditIncome, onDeleteIncome }) => {
  return (
    <div className="mt-2 bg-white bg-opacity-60 rounded-lg p-2 text-[10px]">
      <h3 className="font-bold mb-1">Historial de Ingresos de este Mes:</h3>
      {incomeHistory.map((entry, index) => (
        <div key={index} className="flex justify-between items-center mb-1">
          <span className="text-gray-600">
            {format(new Date(entry.date), 'dd/MM/yyyy', { locale: es })}: ${entry.amount}
          </span>
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-4 w-4 p-0"
              onClick={() => onEditIncome(entry)}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
              onClick={() => onDeleteIncome(entry)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};