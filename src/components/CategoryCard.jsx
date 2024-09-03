import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2 } from 'lucide-react';

export const CategoryCard = ({ title, expenses = [], onEdit, onDelete, budget, onSetBudget }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedDetails, setEditedDetails] = useState('');
  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budget || '');

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

  return (
    <Card className="bg-white bg-opacity-80 border-green-300 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-700 flex justify-between items-center">
          <span>{title}</span>
          {budget ? (
            <Button onClick={() => setIsSettingBudget(true)} className="bg-green-500 hover:bg-green-600 text-white">
              Edit Budget: ${budget}
            </Button>
          ) : (
            <Button onClick={() => setIsSettingBudget(true)} className="bg-green-500 hover:bg-green-600 text-white">
              Set Budget
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSettingBudget ? (
          <div className="flex space-x-2 mb-4">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              placeholder="Enter budget"
              className="border-green-300 focus:border-green-500"
            />
            <Button onClick={handleSetBudget} className="bg-green-500 hover:bg-green-600 text-white">Save</Button>
          </div>
        ) : null}
        <p className="font-bold text-green-600">Total: ${totalExpense.toFixed(2)}</p>
        <Progress value={progressPercentage} className="my-2 gradient-progress" />
        {expenses.map((expense, index) => (
          <div key={index} className="mt-2 p-2 bg-green-50 rounded border border-green-200 relative">
            {editingExpense === expense ? (
              <>
                <Input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  className="mb-2 border-green-300 focus:border-green-500"
                />
                <Input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="mb-2 border-green-300 focus:border-green-500"
                />
                <Input
                  value={editedDetails}
                  onChange={(e) => setEditedDetails(e.target.value)}
                  className="mb-2 border-green-300 focus:border-green-500"
                />
                <Button onClick={handleSave} className="mr-2 bg-green-500 hover:bg-green-600 text-white">Save</Button>
                <Button onClick={() => setEditingExpense(null)} variant="secondary" className="bg-green-200 hover:bg-green-300 text-green-800">Cancel</Button>
              </>
            ) : (
              <>
                <p>Amount: ${expense.amount}</p>
                <p>Date: {expense.date}</p>
                <p>Details: {expense.details}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button onClick={() => handleEdit(expense)} size="icon" variant="ghost" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => onDelete(expense)} size="icon" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
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