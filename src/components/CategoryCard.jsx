import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Pencil,
  Trash2,
  DollarSign,
  School,
  Home,
  Car,
  Utensils,
  Dog,
  Package,
  Pill,
  Zap,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const categoryColors = {
  Escuela: "bg-blue-500",
  Renta: "bg-purple-500",
  Servicios: "bg-yellow-500",
  Uber: "bg-black",
  Comida: "bg-red-500",
  Roma: "bg-pink-500",
  Otros: "bg-indigo-500",
  Medicinas: "bg-orange-500",
};

const categoryIcons = {
  Escuela: <School className="w-5 h-5 text-white" />,
  Renta: <Home className="w-5 h-5 text-white" />,
  Servicios: <Zap className="w-5 h-5 text-white" />,
  Uber: <Car className="w-5 h-5 text-white" />,
  Comida: <Utensils className="w-5 h-5 text-white" />,
  Roma: <Dog className="w-5 h-5 text-white" />,
  Otros: <Package className="w-5 h-5 text-white" />,
  Medicinas: <Pill className="w-5 h-5 text-white" />,
};

const ExpenseItem = ({ expense, onEdit, onDelete, color }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className={`${color} bg-opacity-20 rounded border border-gray-200 p-2 text-xs mb-2`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm">${expense.amount}</p>
        <p className="text-gray-800 text-sm">{expense.details}</p>
        <p className="text-gray-600 text-[10px]">
          Fecha:&nbsp;{new Date(expense.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
        </p>
      </div>
      <div className="flex space-x-1">
        <Button
          onClick={() => onEdit(expense)}
          size="icon"
          variant="ghost"
          className="h-6 w-6 p-0"
        >
          <Pencil className="h-3 w-3" />
        </Button>
        <Button
          onClick={() => onDelete(expense)}
          size="icon"
          variant="ghost"
          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  </motion.div>
);

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
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedDetails, setEditedDetails] = useState("");
  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || "");

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const progressPercentage = budget ? (totalExpense / budget) * 100 : 0;

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setEditedAmount(expense.amount);
    setEditedDate(expense.date);
    setEditedDetails(expense.details);
  };

  const handleSave = () => {
    onEdit({
      ...editingExpense,
      amount: editedAmount,
      date: editedDate,
      details: editedDetails,
    });
    setEditingExpense(null);
  };

  const handleSetBudget = () => {
    onSetBudget(parseFloat(newBudget));
    setIsSettingBudget(false);
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full ${isExpanded ? 'h-auto' : 'h-24'}`}
    >
      <Card className={`w-full bg-white bg-opacity-90 border-green-300 shadow-lg overflow-hidden ${isExpanded ? 'h-auto' : 'h-24'}`}>
        <CardHeader className="flex flex-col items-center space-y-2 p-3">
          <div className="flex items-center justify-between w-full">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 ${categoryColors[title]} rounded-full flex items-center justify-center cursor-pointer`}
              onClick={onExpand}
            >
              {categoryIcons[title] || "🐸"}
            </motion.div>
            <CardTitle className="text-gray-800 font-bold text-center flex-grow text-sm">
              {title}
            </CardTitle>
            <Button
              onClick={() => setIsSettingBudget(true)}
              className="bg-green-500 hover:bg-green-600 text-white p-2 w-12 h-12 flex items-center justify-center"
            >
              <DollarSign className="h-6 w-6" />
            </Button>
          </div>
          {isExpanded && (
            <>
              <div className="flex flex-col w-full">
                <p className="font-bold text-green-600 text-md">
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
                className="w-full h-2 bg-gray-200"
              />
              <p className="text-s text-right w-full">
                {progressPercentage.toFixed(1)}% gastado
              </p>
            </>
          )}
        </CardHeader>
        {isExpanded && (
          <CardContent className="p-2">
            {isSettingBudget ? (
              <div className="flex space-x-2 mb-4">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="Ingresar presupuesto"
                  className="border-green-300 focus:border-green-500 text-sm"
                />
                <Button
                  onClick={handleSetBudget}
                  className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 p-0"
                >
                  <Check className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => setIsSettingBudget(false)}
                  className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : null}
            <div className="space-y-2">
              {expenses.map((expense, index) => (
                <ExpenseItem
                  key={index}
                  expense={expense}
                  onEdit={handleEdit}
                  onDelete={onDelete}
                  color={categoryColors[title]}
                />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};