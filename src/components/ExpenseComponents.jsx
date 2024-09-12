import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X } from "lucide-react";

export const ExpenseItem = ({ expense, onEdit, onDelete, color }) => (
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

export const EditExpenseForm = ({ expense, onSave, onCancel }) => {
  const [editedAmount, setEditedAmount] = React.useState(expense.amount);
  const [editedDate, setEditedDate] = React.useState(expense.date);
  const [editedDetails, setEditedDetails] = React.useState(expense.details);

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