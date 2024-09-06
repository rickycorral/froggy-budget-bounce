import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { IncomeCard } from "../components/IncomeCard";
import { ExpandableCard } from "../components/ExpandableCard";
import { CategoryCard } from "../components/CategoryCard";
import { ExpensePieChart } from "../components/ExpensePieChart";
import { Search } from "../components/Search";
import { Footer } from "../components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? JSON.parse(savedIncome) : "";
  });
  const [categoryBudgets, setCategoryBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("categoryBudgets");
    return savedBudgets ? JSON.parse(savedBudgets) : {};
  });
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("categoryBudgets", JSON.stringify(categoryBudgets));
  }, [expenses, income, categoryBudgets]);

  const categories = [
    "Escuela",
    "Renta",
    "Servicios",
    "Uber",
    "Comida",
    "Roma",
    "Otros",
    "Medicinas",
  ];

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const handleEditExpense = (editedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === editedExpense.id ? editedExpense : expense
      )
    );
  };

  const handleDeleteExpense = (expenseToDelete) => {
    setExpenses(
      expenses.filter((expense) => expense.id !== expenseToDelete.id)
    );
  };

  const handleSaveIncome = (newIncome) => {
    setIncome(newIncome);
  };

  const handleSetBudget = (category, budget) => {
    setCategoryBudgets({ ...categoryBudgets, [category]: budget });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    const expenseMonth = new Date(expense.date).getMonth();
    const matchesMonth = monthFilter === "all" || expenseMonth === parseInt(monthFilter);
    return matchesSearch && matchesCategory && matchesMonth;
  }).sort((a, b) => {
    if (sortOrder === "desc") {
      return parseFloat(b.amount) - parseFloat(a.amount);
    } else {
      return parseFloat(a.amount) - parseFloat(b.amount);
    }
  });

  const totalSavings = expenses
    .filter((expense) => expense.type === "savings")
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const totalExpenses = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const handleExpandCard = (cardName) => {
    setExpandedCard(expandedCard === cardName ? null : cardName);
    if (cardName !== expandedCard) {
      setExpandedCategory(null);
    }
  };

  const handleExpandCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    if (category !== expandedCategory) {
      setExpandedCard(null);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-green-50 bg-opacity-90">
      <Header />
      <div className="max-w-md mx-auto mb-4">
        <IncomeCard
          onSave={handleSaveIncome}
          currentIncome={income}
          totalExpenses={totalExpenses}
          totalSavings={totalSavings}
        />
      </div>
      <div className="flex justify-center my-4 space-x-4">
        <ExpandableCard
          title="Ahorros"
          onAdd={handleAddExpense}
          categories={categories}
          totalAmount={totalSavings}
          isExpanded={expandedCard === "Ahorros"}
          onExpand={() => handleExpandCard("Ahorros")}
        />
        <ExpandableCard
          title="Gastos"
          onAdd={handleAddExpense}
          categories={categories}
          totalAmount={totalExpenses}
          isExpanded={expandedCard === "Gastos"}
          onExpand={() => handleExpandCard("Gastos")}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 my-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category}
            expenses={expenses.filter((e) => e.category === category)}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            budget={categoryBudgets[category]}
            onSetBudget={(budget) => handleSetBudget(category, budget)}
            isExpanded={expandedCategory === category}
            onExpand={() => handleExpandCategory(category)}
          />
        ))}
      </div>
      <ExpensePieChart expenses={expenses} />
      <div className="mb-4 space-y-2">
        <Search onSearch={setSearchTerm} />
        <div className="flex space-x-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los meses</SelectItem>
              {[...Array(12)].map((_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ordenar por monto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Mayor a menor</SelectItem>
              <SelectItem value="asc">Menor a mayor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-2xl mx-auto bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Detalles
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((expense, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {expense.details}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {expense.category || "Ahorros"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  ${expense.amount}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {expense.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Index;