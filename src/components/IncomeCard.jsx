import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const IncomeCard = ({ onSave, currentIncome, totalExpenses, totalSavings }) => {
  const [income, setIncome] = useState('');

  const handleSave = () => {
    onSave(income);
    setIncome('');
  };

  const totalBudget = parseFloat(currentIncome) || 0;
  const totalSpent = totalExpenses + totalSavings;
  const remainingBudget = totalBudget - totalSpent;
  const progressPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <Card className="w-auto max-w-xs mx-auto bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg p-2">
      <CardHeader className="p-2">
        <CardTitle className="text-lg font-bold">Ingresos Mensuales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Ingresos:</span>
          <span className="font-bold">${totalBudget.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Gastos:</span>
          <span className="font-bold">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Ahorros:</span>
          <span className="font-bold">${totalSavings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">Restante:</span>
          <span className="font-bold">${remainingBudget.toFixed(2)}</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-white" />
        <p className="text-xs text-right">{progressPercentage.toFixed(1)}% del presupuesto gastado</p>
        <div className="flex space-x-2 items-center">
          <Input
            type="number"
            placeholder="Actualizar ingresos"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border-white focus:border-green-300 text-black text-xs"
          />
          <Button onClick={handleSave} className="bg-white text-green-500 hover:bg-green-100 font-bold text-xs px-2 py-1">Actualizar</Button>
        </div>
      </CardContent>
    </Card>
  );
};
