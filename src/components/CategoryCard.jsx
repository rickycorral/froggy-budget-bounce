import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, Check, X, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import rominaImage from '../romina.jpg';

const categoryColors = {
  Escuela: "bg-blue-500",
  Renta: "bg-purple-500",
  Servicios: "bg-yellow-500",
  Uber: "bg-black",
  Comida: "bg-red-500",
  Roma: "bg-blue-100",
  Otros: "bg-indigo-500",
  Medicinas: "bg-orange-500",
  Ahorros: "bg-green-500",
};

const categoryIcons = {
  Escuela: "🎓",
  Renta: "🏠",
  Servicios: "🔌",
  Uber: "🚗",
  Comida: "🍽️",
  Roma: "🐕",
  Otros: "📦",
  Medicinas: "💊",
  Ahorros: "💰",
};

const ExpenseItem = ({ expense, onEdit, onDelete, color }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className={`${color} bg-opacity-20 rounded border border-gray-200 p-1 text-xs mb-1`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-xs">${expense.amount}</p>
        <p className="text-gray-800 text-xs">{expense.details}</p>
        <p className="text-gray-600 text-[8px]">
          {new Date(expense.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
        </p>
      </div>
      <div className="flex space-x-1">
        <Button
          onClick={() => onEdit(expense)}
          size="icon"
          variant="ghost"
          className="h-5 w-5 p-0"
        >
          <Pencil className="h-3 w-3" />
        </Button>
        <Button
          onClick={() => onDelete(expense)}
          size="icon"
          variant="ghost"
          className="h-5 w-5 p-0 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  </motion.div>
);

const EditExpenseForm = ({ expense, onSave, onCancel }) => {
  const [editedAmount, setEditedAmount] = useState(expense.amount);
  const [editedDate, setEditedDate] = useState(expense.date);
  const [editedDetails, setEditedDetails] = useState(expense.details);

  const handleSave = () => {
    onSave({
      ...expense,
      amount: editedAmount,
      date: editedDate,
      details: editedDetails,
    });
  };

  return (
    <div className="space-y-2 p-2 bg-white rounded shadow">
      <Input
        type="number"
        value={editedAmount}
        onChange={(e) => setEditedAmount(e.target.value)}
        placeholder="Monto"
        className="text-xs"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <Input
        type="date"
        value={editedDate}
        onChange={(e) => setEditedDate(e.target.value)}
        className="text-xs"
      />
      <Input
        value={editedDetails}
        onChange={(e) => setEditedDetails(e.target.value)}
        placeholder="Detalles"
        className="text-xs"
      />
      <div className="flex justify-end space-x-2">
        <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600">
          <Check className="h-4 w-4" />
        </Button>
        <Button onClick={onCancel} size="sm" className="bg-red-500 hover:bg-red-600">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const CategoryCard = ({
  title,
  expenses = [],
  onEdit,
  onDelete,
  budget,
  onSetBudget,
  isExpanded,
  onExpand,
}) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || "");

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const progressPercentage = budget ? (totalExpense / budget) * 100 : 0;

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleSave = (editedExpense) => {
    onEdit(editedExpense);
    setEditingExpense(null);
  };

  const handleSetBudget = () => {
    onSetBudget(parseFloat(newBudget));
    setIsSettingBudget(false);
  };

  const cardStyle = title === "Roma" 
    ? "bg-white border-blue-300 bg-opacity-90" 
    : "bg-green-50 bg-opacity-80 border-green-300";
  const headerStyle = title === "Roma" ? "bg-blue-100" : "bg-green-200";

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full ${isExpanded ? 'h-auto' : 'h-24'}`}
    >
      <Card className={`w-full ${cardStyle} shadow-lg overflow-hidden ${isExpanded ? 'h-auto' : 'h-24'}`}>
        <CardHeader className={`flex flex-col items-center space-y-2 p-2 ${headerStyle}`}>
          <div className="flex items-center justify-between w-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 ${categoryColors[title]} rounded-full flex items-center justify-center cursor-pointer`}
              onClick={onExpand}
            >
              {categoryIcons[title]}
            </motion.div>
            <CardTitle className="text-gray-800 font-bold text-center flex-grow text-sm">
              {title}
            </CardTitle>
            <Button
              onClick={() => {
                setIsSettingBudget(true);
                onExpand();
              }}
              className="bg-green-500 hover:bg-green-600 text-white p-1 w-6 h-6 flex items-center justify-center"
            >
              <DollarSign className="w-4 h-4" />
            </Button>
          </div>
          {title === "Roma" && (
            <p className="text-xs font-semibold text-blue-600">Te amamos Romina</p>
          )}
          <div className="flex flex-col w-full">
            <p className="font-bold text-green-600 text-xs">
              Total: ${totalExpense.toFixed(2)}
            </p>
            {budget && (
              <p className="font-bold text-blue-600 text-xxs">
                Presupuesto: ${parseFloat(budget).toFixed(2)}
              </p>
            )}
          </div>
          <Progress
            value={progressPercentage}
            className="w-full h-1 bg-gray-200"
          />
          <p className="text-xxs text-right w-full">
            {progressPercentage.toFixed(1)}% gastado
          </p>
        </CardHeader>
        {isExpanded && (
          <CardContent className="p-1">
            {isSettingBudget ? (
              <div className="flex space-x-1 mb-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="Ingresar presupuesto"
                  className="border-green-300 focus:border-green-500 text-xs"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <Button
                  onClick={handleSetBudget}
                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 p-0"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsSettingBudget(false)}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : null}
            {title === "Roma" && (
              <div className="mb-2">
                <img src={rominaImage} alt="Romina" className="w-full h-auto rounded-lg" />
              </div>
            )}
            <div className="space-y-1">
              <AnimatePresence>
                {expenses.map((expense) => (
                  editingExpense && editingExpense.id === expense.id ? (
                    <EditExpenseForm
                      key={expense.id}
                      expense={expense}
                      onSave={handleSave}
                      onCancel={() => setEditingExpense(null)}
                    />
                  ) : (
                    <ExpenseItem
                      key={expense.id}
                      expense={expense}
                      onEdit={handleEdit}
                      onDelete={onDelete}
                      color={categoryColors[title]}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};