import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CategoryCard = ({ title, expenses = [], onEdit, onDelete }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [editedAmount, setEditedAmount] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedDetails, setEditedDetails] = useState('');

  const totalExpense = expenses.length > 0
    ? expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
    : 0;

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">Total: ${totalExpense.toFixed(2)}</p>
        {expenses.map((expense, index) => (
          <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
            {editingExpense === expense ? (
              <>
                <Input
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="mb-2"
                />
                <Input
                  value={editedDetails}
                  onChange={(e) => setEditedDetails(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleSave} className="mr-2">Save</Button>
                <Button onClick={() => setEditingExpense(null)} variant="secondary">Cancel</Button>
              </>
            ) : (
              <>
                <p>Amount: ${expense.amount}</p>
                <p>Date: {expense.date}</p>
                <p>Details: {expense.details}</p>
                <div className="mt-2">
                  <Button onClick={() => handleEdit(expense)} className="mr-2">Edit</Button>
                  <Button onClick={() => onDelete(expense)} variant="destructive">Delete</Button>
                </div>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
