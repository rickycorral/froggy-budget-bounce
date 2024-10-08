import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const BudgetCard = ({ onSave, currentIncome, totalExpenses, totalSavings }) => {
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
    <Card className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Presupuesto Mensual</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Ingresos Totales:</span>
          <span className="text-2xl font-bold">${totalBudget.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Gastos Totales:</span>
          <span className="text-2xl font-bold">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Ahorros Totales:</span>
          <span className="text-2xl font-bold">${totalSavings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Presupuesto Restante:</span>
          <span className="text-2xl font-bold">${remainingBudget.toFixed(2)}</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-white" />
        <p className="text-sm text-right">{progressPercentage.toFixed(1)}% del presupuesto utilizado</p>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Actualizar ingresos"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border-white focus:border-green-300 text-black"
          />
          <Button onClick={handleSave} className="bg-white text-green-500 hover:bg-green-100 font-bold">Actualizar</Button>
        </div>
      </CardContent>
    </Card>
  );
};