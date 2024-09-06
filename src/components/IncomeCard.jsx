import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const IncomeCard = ({ onSave, currentIncome, totalExpenses, totalSavings, selectedMonth, onMonthChange }) => {
  const [income, setIncome] = useState('');

  const handleSave = () => {
    onSave(income, selectedMonth);
    setIncome('');
  };

  const totalBudget = parseFloat(currentIncome) || 0;
  const remainingBudget = totalBudget - totalExpenses;
  const progressPercentage = totalBudget > 0 ? ((totalExpenses + totalSavings) / totalBudget) * 100 : 0;

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-white bg-opacity-90 border-green-300 shadow-lg p-4 overflow-hidden relative">
        <CardHeader className="p-2 relative z-10">
          <CardTitle className="text-xl font-bold flex items-center justify-between text-gray-800">
            <span>Ingresos Mensuales</span>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 relative z-10">
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <DollarSign className="mr-1 w-4 h-4" />
              <span className="font-semibold">Ingresos:</span>
            </motion.div>
            <span className="font-bold text-right">${totalBudget.toFixed(2)}</span>
            
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <TrendingDown className="mr-1 w-4 h-4" />
              <span className="font-semibold">Gastos:</span>
            </motion.div>
            <span className="font-bold text-right">${totalExpenses.toFixed(2)}</span>
            
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <TrendingUp className="mr-1 w-4 h-4" />
              <span className="font-semibold">Ahorros:</span>
            </motion.div>
            <span className="font-bold text-right">${totalSavings.toFixed(2)}</span>
            
            <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Wallet className="mr-1 w-4 h-4" />
              <span className="font-semibold">Restante:</span>
            </motion.div>
            <span className="font-bold text-right">${remainingBudget.toFixed(2)}</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-white bg-opacity-30" />
          <p className="text-xs text-right text-gray-600">{progressPercentage.toFixed(1)}% del presupuesto utilizado</p>
          <div className="flex space-x-2 items-center">
            <Input
              type="number"
              placeholder="Actualizar ingresos"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="border-gray-300 focus:border-green-300 text-gray-700 text-sm"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm">Actualizar</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};