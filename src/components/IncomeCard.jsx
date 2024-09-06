import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
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
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-white bg-opacity-90 border-green-300 shadow-lg p-4 overflow-hidden relative">
        <CardHeader className="p-2 relative z-10">
          <CardTitle className="text-xl font-bold flex items-center justify-between text-gray-800">
            <span>Ingresos Mensuales</span>
            <Select value={selectedMonth || ""} onValueChange={onMonthChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {selectedMonth ? selectedMonth : "Seleccionar Mes"}
                </SelectValue>
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
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <DollarSign className="mr-1 w-4 h-4" />
                  <span className="font-semibold">Ingresos:</span>
                </div>
                <span className="font-bold text-right">${totalBudget.toFixed(2)}</span>
                
                <div className="flex items-center">
                  <TrendingDown className="mr-1 w-4 h-4" />
                  <span className="font-semibold">Gastos:</span>
                </div>
                <span className="font-bold text-right">${totalExpenses.toFixed(2)}</span>
                
                <div className="flex items-center">
                  <TrendingUp className="mr-1 w-4 h-4" />
                  <span className="font-semibold">Ahorros:</span>
                </div>
                <span className="font-bold text-right">${totalSavings.toFixed(2)}</span>
                
                <div className="flex items-center">
                  <Wallet className="mr-1 w-4 h-4" />
                  <span className="font-semibold">Restante:</span>
                </div>
                <span className="font-bold text-right">${remainingBudget.toFixed(2)}</span>
              </div>
            </motion.div>
          </AnimatePresence>
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