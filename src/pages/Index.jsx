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

  const filteredExpenses = expenses.filter(expense =>
    expense.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-100 p-4">
      <Header />
      <IncomeCard />
      <div className="flex justify-between my-4">
        <ExpandableCard title="Savings" onAdd={handleAddExpense} categories={categories} />
        <ExpandableCard title="Expense" onAdd={handleAddExpense} categories={categories} />
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            title={category} 
            expenses={expenses.filter(e => e.category === category)}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        ))}
      </div>
      <ExpensePieChart expenses={expenses} />
      <Search onSearch={setSearchTerm} />
      <div className="mt-4">
        {filteredExpenses.map((expense, index) => (
          <div key={index} className="bg-white p-2 mb-2 rounded">
            <p>{expense.details}</p>
            <p>Category: {expense.category}</p>
            <a href={`/expense/${expense.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
