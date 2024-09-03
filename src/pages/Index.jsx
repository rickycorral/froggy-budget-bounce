import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { IncomeCard } from '../components/IncomeCard';
import { ExpandableCard } from '../components/ExpandableCard';
import { CategoryCard } from '../components/CategoryCard';
import { ExpensePieChart } from '../components/ExpensePieChart';
import { Search } from '../components/Search';

const Index = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem('income');
    return savedIncome ? JSON.parse(savedIncome) : '';
  });
  const [categoryBudgets, setCategoryBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem('categoryBudgets');
    return savedBudgets ? JSON.parse(savedBudgets) : {};
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('income', JSON.stringify(income));
    localStorage.setItem('categoryBudgets', JSON.stringify(categoryBudgets));
  }, [expenses, income, categoryBudgets]);

  const categories = [
    'Escuela', 'Renta', 'Servicios', 'Transporte',
    'Comida', 'Mascota', 'Entretenimiento', 'Medicinas'
  ];

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const handleEditExpense = (editedExpense) => {
    setExpenses(expenses.map(expense => 
      expense.id === editedExpense.id ? editedExpense : expense
    ));
  };

  const handleDeleteExpense = (expenseToDelete) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseToDelete.id));
  };

  const handleSaveIncome = (newIncome) => {
    setIncome(newIncome);
  };

  const handleSetBudget = (category, budget) => {
    setCategoryBudgets({...categoryBudgets, [category]: budget});
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSavings = expenses
    .filter(expense => expense.type === 'savings')
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const totalExpenses = expenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="min-h-screen p-4 bg-green-50 bg-opacity-90">
      <Header />
      <IncomeCard onSave={handleSaveIncome} currentIncome={income} />
      <div className="flex justify-center my-4 space-x-4">
        <ExpandableCard title="Ahorros" onAdd={handleAddExpense} categories={categories} totalAmount={totalSavings} />
        <ExpandableCard title="Gastos" onAdd={handleAddExpense} categories={categories} totalAmount={totalExpenses} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            title={category} 
            expenses={expenses.filter(e => e.category === category)}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            budget={categoryBudgets[category]}
            onSetBudget={(budget) => handleSetBudget(category, budget)}
          />
        ))}
      </div>
      <ExpensePieChart expenses={expenses} />
      <Search onSearch={setSearchTerm} />
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.details}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.category || 'Ahorros'}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">${expense.amount}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;