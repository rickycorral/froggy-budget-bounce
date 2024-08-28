import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const CategoryCard = ({ title, expenses, onEdit, onDelete }) => {
  const totalExpense = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-bold">Total: ${totalExpense.toFixed(2)}</p>
        {expenses.map((expense, index) => (
          <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
            <p>Amount: ${expense.amount}</p>
            <p>Date: {expense.date}</p>
            <p>Details: {expense.details}</p>
            <div className="mt-2">
              <Button onClick={() => onEdit(expense)} className="mr-2">Edit</Button>
              <Button onClick={() => onDelete(expense)} variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
