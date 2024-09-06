import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export const IncomeCard = ({ onSave, currentIncome, totalExpenses, totalSavings }) => {
  const [income, setIncome] = useState('');

  const handleSave = () => {
    onSave(income);
    setIncome('');
  };

  const totalBudget = parseFloat(currentIncome) || 0;
  const remainingBudget = totalBudget - totalExpenses;
  const progressPercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  return (
    <motion.div
      className="w-auto max-w-md mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-white shadow-lg p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
        <CardHeader className="p-2 relative z-10">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Wallet className="mr-2" /> Ingresos Mensuales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 relative z-10">
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold flex items-center"><DollarSign className="mr-1" /> Ingresos:</span>
            <span className="font-bold">${totalBudget.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold flex items-center"><TrendingDown className="mr-1" /> Gastos:</span>
            <span className="font-bold">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold flex items-center"><TrendingUp className="mr-1" /> Ahorros:</span>
            <span className="font-bold">${totalSavings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold flex items-center"><Wallet className="mr-1" /> Restante:</span>
            <span className="font-bold">${remainingBudget.toFixed(2)}</span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-white bg-opacity-30" />
          <p className="text-sm text-right">{progressPercentage.toFixed(1)}% del presupuesto gastado</p>
          <div className="flex space-x-2 items-center">
            <Input
              type="number"
              placeholder="Actualizar ingresos"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="border-white focus:border-green-300 text-black text-sm"
            />
            <Button onClick={handleSave} className="bg-white text-purple-600 hover:bg-purple-100 font-bold">Actualizar</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};