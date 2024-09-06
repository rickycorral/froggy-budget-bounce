import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const lightColors = [
  'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-pink-100', 
  'bg-purple-100', 'bg-indigo-100', 'bg-red-100', 'bg-orange-100'
];

export const IncomeCard = ({ onSave, currentIncome, totalExpenses, totalSavings }) => {
  const [income, setIncome] = useState('');
  const [bgColor, setBgColor] = useState(lightColors[0]);

  useEffect(() => {
    const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];
    setBgColor(randomColor);
  }, [currentIncome]);

  const handleSave = () => {
    onSave(income);
    setIncome('');
  };

  const totalBudget = parseFloat(currentIncome) || 0;
  const remainingBudget = totalBudget - totalExpenses;
  const progressPercentage = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;

  const handleCardClick = () => {
    const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];
    setBgColor(randomColor);
  };

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleCardClick}
    >
      <Card className={`${bgColor} shadow-lg p-4 overflow-hidden relative cursor-pointer`}>
        <CardHeader className="p-2 relative z-10">
          <CardTitle className="text-xl font-bold flex items-center text-gray-800">
            <Wallet className="mr-2" /> Ingresos Mensuales
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
          <p className="text-xs text-right text-gray-600">{progressPercentage.toFixed(1)}% del presupuesto gastado</p>
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