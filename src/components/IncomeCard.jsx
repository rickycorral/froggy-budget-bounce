import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wallet, Sparkles, Edit2 } from 'lucide-react';
import { FaFrog } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const IncomeCard = ({ onSave, currentIncome, totalExpenses, totalSavings, selectedMonth, onMonthChange, incomeHistory }) => {
  const [income, setIncome] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(income, selectedMonth);
    setIncome('');
    setIsEditing(false);
  };

  const totalBudget = parseFloat(currentIncome) || 0;
  const remainingBudget = totalBudget - totalExpenses;
  const progressPercentage = totalBudget > 0 ? ((totalExpenses + totalSavings) / totalBudget) * 100 : 0;

  return (
    <motion.div
      className="w-full max-w-xs mx-auto"
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="bg-gradient-to-br from-green-400 to-green-600 shadow-lg p-2 overflow-hidden relative rounded-xl">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundImage: [
              'radial-gradient(circle, #ffffff 2px, transparent 2px)',
              'radial-gradient(circle, #ffffff 3px, transparent 3px)',
              'radial-gradient(circle, #ffffff 2px, transparent 2px)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <CardHeader className="p-1 relative z-10">
          <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ingresos Mensuales
              <motion.span
                className="inline-block ml-2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.span>
            </motion.span>
            <Select value={selectedMonth || ""} onValueChange={onMonthChange}>
              <SelectTrigger className="w-[120px] bg-white bg-opacity-20 border-none text-white text-xxs">
                <SelectValue>
                  {selectedMonth ? selectedMonth : "Seleccionar Mes"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month} className="text-xs">{month}</SelectItem>
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
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-1 text-xxs text-white">
                {[
                  { icon: DollarSign, label: "Ingresos", value: totalBudget, onClick: () => setIsEditing(true) },
                  { icon: TrendingDown, label: "Gastos", value: totalExpenses },
                  { icon: TrendingUp, label: "Ahorros", value: totalSavings },
                  { icon: Wallet, label: "Restante", value: remainingBudget },
                ].map(({ icon: Icon, label, value, onClick }, index) => (
                  <motion.div
                    key={label}
                    className="flex items-center justify-between bg-white bg-opacity-20 p-1 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={onClick}
                  >
                    <div className="flex items-center">
                      <Icon className="mr-0.5 w-3 h-3" />
                      <span className="font-semibold">{label}:</span>
                    </div>
                    <span className="font-bold">${value.toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Progress value={progressPercentage} className="h-1.5 bg-white bg-opacity-30" />
            <p className="text-[10px] text-right text-white mt-0.5">{progressPercentage.toFixed(1)}% del presupuesto utilizado</p>
          </motion.div>
          {isEditing ? (
            <motion.div
              className="flex space-x-1 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Input
                type="number"
                placeholder="Actualizar ingresos"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="border-white border-opacity-50 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:border-white text-xxs py-0.5"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Button
                onClick={handleSave}
                className="bg-white text-green-600 hover:bg-green-100 font-bold text-xxs py-0.5 px-2 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Actualizar
              </Button>
            </motion.div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-white text-green-600 hover:bg-green-100 font-bold text-xxs py-0.5 px-2 transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
            >
              <Edit2 className="w-3 h-3 mr-1" /> Editar Ingresos
            </Button>
          )}
        </CardContent>
        <motion.div
          className="absolute bottom-2 right-3 text-white opacity-50"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            times: [0, 0.4, 1],
            repeatDelay: 3,
          }}
        >
          <FaFrog className="w-4 h-4" />
        </motion.div>
      </Card>
      {incomeHistory && incomeHistory.length > 0 && (
        <div className="mt-2 bg-white bg-opacity-80 rounded-lg p-2 text-xs">
          <h3 className="font-bold mb-1">Historial de Ingresos:</h3>
          {incomeHistory.map((entry, index) => (
            <p key={index} className="text-gray-600">
              {format(new Date(entry.date), 'dd/MM/yyyy')}: ${entry.amount}
            </p>
          ))}
        </div>
      )}
    </motion.div>
  );
};