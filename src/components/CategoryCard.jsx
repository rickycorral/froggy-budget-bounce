import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, Check, X, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryColors, categoryIcons } from "../utils/categoryUtils";
import { ExpenseItem, EditExpenseForm } from "./ExpenseComponents";
import { RomaCard } from "./RomaCard";

export const CategoryCard = ({
  title,
  expenses = [],
  onEdit,
  onDelete,
  isExpanded,
  onExpand,
  totalBudget,
  onUpdateBudget,
}) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(totalBudget);

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

  const handleUpdateBudget = () => {
    if (onUpdateBudget) {
      onUpdateBudget(newBudget);
    }
    setIsEditingBudget(false);
  };

  const handleBudgetClick = () => {
    setIsEditingBudget(true);
    onExpand();
  };

  if (title === "Roma") {
    return <RomaCard isExpanded={isExpanded} onExpand={onExpand} />;
  }

  const cardStyle = "bg-green-50 bg-opacity-80 border-green-300";
  const headerStyle = "bg-green-200";

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
              size="icon"
              variant="ghost"
              className="h-6 w-6 p-0 bg-green-500 rounded-full"
              onClick={handleBudgetClick}
            >
              <DollarSign className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div className="flex flex-col w-full">
            <p className="font-bold text-green-600 text-xs">
              Total: ${totalExpense.toFixed(2)} / ${totalBudget}
            </p>
            <Progress value={(totalExpense / totalBudget) * 100} className="h-1 bg-green-200" />
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="p-1">
            {isEditingBudget ? (
              <div className="flex space-x-1 mb-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="text-xs"
                />
                <Button onClick={handleUpdateBudget} size="sm" className="bg-green-500 hover:bg-green-600">
                  <Check className="h-4 w-4" />
                </Button>
                <Button onClick={() => setIsEditingBudget(false)} size="sm" className="bg-red-500 hover:bg-red-600">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : null}
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