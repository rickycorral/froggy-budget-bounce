import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, DollarSign } from 'lucide-react';
import { motion } from "framer-motion";

export const CategoryCard = ({ title, expenses = [], onEdit, onDelete, budget, onSetBudget }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedDetails, setEditedDetails] = useState('');
  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || '');
  const [isJumping, setIsJumping] = useState(false);

  const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
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
      details: editedDetails
    });
    setEditingExpense(null);
  };

  const handleSetBudget = () => {
    onSetBudget(parseFloat(newBudget));
    setIsSettingBudget(false);
  };

  const getCardColor = () => {
    const colors = [
      'bg-blue-100 bg-opacity-90 border-blue-300',
      'bg-green-100 bg-opacity-90 border-green-300',
      'bg-yellow-100 bg-opacity-90 border-yellow-300',
      'bg-red-100 bg-opacity-90 border-red-300',
      'bg-purple-100 bg-opacity-90 border-purple-300',
      'bg-pink-100 bg-opacity-90 border-pink-300',
      'bg-indigo-100 bg-opacity-90 border-indigo-300',
      'bg-teal-100 bg-opacity-90 border-teal-300'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const cardColor = getCardColor();

  const handleFrogClick = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  return (
    <Card className={`${cardColor} shadow-lg`}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <motion.div
            animate={isJumping ? { y: [-10, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={handleFrogClick}
            className="cursor-pointer"
          >
            🐸
          </motion.div>
          <CardTitle className="text-gray-800 text-lg font-bold">{title}</CardTitle>
        </div>
        <div className="flex-grow"></div>
        {budget ? (
          <Button onClick={() => setIsSettingBudget(true)} className="bg-green-500 hover:bg-green-600 text-white p-2">
            <DollarSign className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setIsSettingBudget(true)} className="bg-green-500 hover:bg-green-600 text-white p-2">
            <DollarSign className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isSettingBudget ? (
          <div className="flex space-x-2 mb-4">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="Ingresar presupuesto"
              className="border-green-300 focus:border-green-500 text-sm"
            />
            <Button onClick={handleSetBudget} className="bg-green-500 hover:bg-green-600 text-white text-xs">Guardar</Button>
          </div>
        ) : null}
        <div className="flex flex-col mb-2">
          <p className="font-bold text-green-600 text-sm">Total: ${totalExpense.toFixed(2)}</p>
          {budget && <p className="font-bold text-blue-600 text-sm">Presupuesto: ${parseFloat(budget).toFixed(2)}</p>}
        </div>
        <div className="relative pt-1">
          <Progress value={progressPercentage} className="h-2 mb-1 gradient-progress" />
          <div className="flex justify-end">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
        {expenses.map((expense, index) => (
          <div key={index} className="mt-2 p-2 bg-white bg-opacity-70 rounded border border-gray-200 relative text-sm">
            {editingExpense === expense ? (
              <>
                <Input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  className="mb-2 border-green-300 focus:border-green-500 text-xs"
                />
                <Input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="mb-2 border-green-300 focus:border-green-500 text-xs"
                />
                <Input
                  value={editedDetails}
                  onChange={(e) => setEditedDetails(e.target.value)}
                  className="mb-2 border-green-300 focus:border-green-500 text-xs"
                />
                <Button onClick={handleSave} className="mr-2 bg-green-500 hover:bg-green-600 text-white text-xs">Guardar</Button>
                <Button onClick={() => setEditingExpense(null)} variant="secondary" className="bg-green-200 hover:bg-green-300 text-green-800 text-xs">Cancelar</Button>
              </>
            ) : (
              <>
                <p className="pr-16">Monto: ${expense.amount} | Fecha: {expense.date} | Detalles: {expense.details}</p>
                <div className="absolute top-1 right-1 flex space-x-1">
                  <Button onClick={() => handleEdit(expense)} size="icon" variant="ghost" className="h-6 w-6 p-0">
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button onClick={() => onDelete(expense)} size="icon" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
