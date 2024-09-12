import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, Check, X } from "lucide-react";
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
  isExpanded,
  onExpand,
}) => {
  const [editingExpense, setEditingExpense] = useState(null);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleSave = (editedExpense) => {
    onEdit(editedExpense);
    setEditingExpense(null);
  };

  const cardStyle = title === "Roma" 
    ? "bg-white border-blue-300 bg-opacity-90" 
    : "bg-green-50 bg-opacity-80 border-green-300";
  const headerStyle = title === "Roma" ? "bg-blue-100" : "bg-green-200";

  const romaBackground = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M12.5 10c-2.65 0-5.05.99-6.9 2.6L3 14.5 1.5 17c-1.65 2.88-2.17 6.79-1.37 10.9 1.5 7.8 5.37 16.54 12.03 22.67C19.9 57.1 29.7 60 40.5 60c2.65 0 5.2-.2 7.5-.6-2.69 1.06-5.55 1.62-8.5 1.62-8.68 0-16.22-3.68-22.09-9.86C11.1 44.55 7.03 35.56 6.93 26c-.07-7.44 2.52-14.28 7.57-19.7 2.71-2.89 5.97-5.28 9.7-7.1C19.5 1.5 14.74 4.5 12.5 10z' fill='%23ADD8E6' fill-opacity='0.4'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M54.627 13.87l-5.909-5.909c-1.17-1.17-3.073-1.17-4.243 0l-4.242 4.242 10.152 10.152 4.242-4.242c1.17-1.17 1.17-3.073 0-4.243zM12.97 43.273l-3.182 9.546 9.546-3.182 29.09-29.09-6.364-6.364-29.09 29.09zm41.818-14.545L41.455 15.39l3.182-3.182 13.333 13.333-3.182 3.182z' fill='%23FFB6C1' fill-opacity='0.4'/%3E%3C/svg%3E")
  `;

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={`w-full ${isExpanded ? 'h-auto' : 'h-24'}`}
    >
      <Card className={`w-full ${cardStyle} shadow-lg overflow-hidden ${isExpanded ? 'h-auto' : 'h-24'}`}
           style={title === "Roma" ? { backgroundImage: romaBackground } : {}}>
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
          </div>
          {title === "Roma" && (
            <p className="text-xs font-semibold text-blue-600">Te amamos Romina</p>
          )}
          <div className="flex flex-col w-full">
            <p className="font-bold text-green-600 text-xs">
              Total: ${totalExpense.toFixed(2)}
            </p>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="p-1">
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