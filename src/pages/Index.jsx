import React, { useState } from 'react';
import { Header } from '../components/Header';
import { IncomeCard } from '../components/IncomeCard';
import { ExpandableCard } from '../components/ExpandableCard';
import { CategoryCard } from '../components/CategoryCard';
import { ExpensePieChart } from '../components/ExpensePieChart';
import { Search } from '../components/Search';

const Index = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [income, setIncome] = useState('');

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

  const filteredExpenses = expenses.filter(expense =>
    expense.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 p-4">
      <Header />
      <IncomeCard onSave={handleSaveIncome} />
      <div className="flex flex-col md:flex-row justify-between my-4 space-y-4 md:space-y-0 md:space-x-4">
        <ExpandableCard title="Savings" onAdd={handleAddExpense} categories={categories} />
        <ExpandableCard title="Expense" onAdd={handleAddExpense} categories={categories} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            title={category} 
            expenses={expenses.filter(e => e.category === category)}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            budget={1000} // Example budget, you might want to make this dynamic
          />
        ))}
      </div>
      <ExpensePieChart expenses={expenses} />
      <Search onSearch={setSearchTerm} />
      <div className="mt-4">
        {filteredExpenses.map((expense, index) => (
          <div key={index} className="bg-white p-2 mb-2 rounded border border-green-200">
            <p>{expense.details}</p>
            <p>Category: {expense.category}</p>
            <p>Amount: ${expense.amount}</p>
            <p>Date: {expense.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;