import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, DollarSign } from 'lucide-react';
import { motion } from "framer-motion";

export const CategoryCard = ({ title, expenses = [], onEdit, onDelete, budget, onSetBudget, isExpanded, onExpand }) => {
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
    <Card className={`${cardColor} shadow-lg ${isExpanded ? 'w-full' : 'w-48 h-48'}`}>
      <CardHeader className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2 w-full">
          <motion.div
            animate={isJumping ? { y: [-10, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={handleFrogClick}
            className="cursor-pointer"
          >
            🐸
          </motion.div>
          <CardTitle className="text-gray-800 text-lg font-bold flex-grow">{title}</CardTitle>
          <Button onClick={onExpand} className="bg-green-500 hover:bg-green-600 text-white p-2">
            {isExpanded ? '▲' : '▼'}
          </Button>
        </div>
        {isExpanded && (
          <div className="flex flex-col w-full">
            <p className="font-bold text-green-600 text-sm">Total: ${totalExpense.toFixed(2)}</p>
            {budget && <p className="font-bold text-blue-600 text-sm">Presupuesto: ${parseFloat(budget).toFixed(2)}</p>}
          </div>
        )}
      </CardHeader>
      {isExpanded && (
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
          ) : (
            <Button onClick={() => setIsSettingBudget(true)} className="bg-green-500 hover:bg-green-600 text-white p-2 mb-4">
              <DollarSign className="h-4 w-4" />
            </Button>
          )}
          <div className="relative pt-1 mb-4">
            <Progress value={progressPercentage} className="h-2 mb-1 gradient-progress" />
            <div className="flex justify-end">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {expenses.map((expense, index) => (
              <div key={index} className="bg-white bg-opacity-70 rounded border border-gray-200 p-2 text-xs">
                {editingExpense === expense ? (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                      className="border-green-300 focus:border-green-500 text-xs"
                    />
                    <Input
                      type="date"
                      value={editedDate}
                      onChange={(e) => setEditedDate(e.target.value)}
                      className="border-green-300 focus:border-green-500 text-xs"
                    />
                    <Input
                      value={editedDetails}
                      onChange={(e) => setEditedDetails(e.target.value)}
                      className="border-green-300 focus:border-green-500 text-xs"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white text-xs">Guardar</Button>
                      <Button onClick={() => setEditingExpense(null)} variant="secondary" className="bg-green-200 hover:bg-green-300 text-green-800 text-xs">Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">${expense.amount}</p>
                      <p className="text-gray-600">{expense.date}</p>
                      <p className="text-gray-800">{expense.details}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button onClick={() => handleEdit(expense)} size="icon" variant="ghost" className="h-6 w-6 p-0">
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button onClick={() => onDelete(expense)} size="icon" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};