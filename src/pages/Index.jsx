import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { IncomeCard } from "../components/IncomeCard";
import { ExpandableCard } from "../components/ExpandableCard";
import { CategoryCard } from "../components/CategoryCard";
import { ExpensePieChart } from "../components/ExpensePieChart";
import { Search } from "../components/Search";
import { Footer } from "../components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowUpDown, Calendar } from "lucide-react";
import { categoryColors } from "../utils/categoryUtils";
import { ExpenseTable } from "../components/ExpenseTable";
import { FilterControls } from "../components/FilterControls";

const Index = () => {
  const [monthlyData, setMonthlyData] = useState(() => {
    const savedData = localStorage.getItem('monthlyData');
    return savedData ? JSON.parse(savedData) : {};
  });
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
    return monthlyData[currentMonth] ? currentMonth : "Seleccionar Mes";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedCards, setExpandedCards] = useState({
    Ahorros: false,
    Gastos: false,
  });
  const [filterMonth, setFilterMonth] = useState("all");

  useEffect(() => {
    localStorage.setItem('monthlyData', JSON.stringify(monthlyData));
  }, [monthlyData]);

  useEffect(() => {
    if (selectedMonth === "Seleccionar Mes") {
      const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
      setSelectedMonth(currentMonth);
    }
  }, [selectedMonth]);

  const currentMonthData = monthlyData[selectedMonth] || {
    income: "",
    expenses: [],
    incomeHistory: [],
    categoryBudgets: {}
  };

  const categories = [
    "Escuela", "Renta", "Servicios", "Uber", "Comida", "Roma", "Otros", "Medicinas", "Ahorros"
  ];

  const handleAddExpense = (expense) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        expenses: [...(prevData[selectedMonth]?.expenses || []), { ...expense, id: Date.now() }]
      }
    }));
  };

  const handleEditExpense = (editedExpense) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        expenses: prevData[selectedMonth].expenses.map(expense =>
          expense.id === editedExpense.id ? editedExpense : expense
        )
      }
    }));
  };

  const handleDeleteExpense = (expenseToDelete) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        expenses: prevData[selectedMonth].expenses.filter(expense => expense.id !== expenseToDelete.id)
      }
    }));
  };

  const handleSaveIncome = (newIncome) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        income: newIncome,
        incomeHistory: [
          ...(prevData[selectedMonth]?.incomeHistory || []),
          { amount: newIncome, date: new Date().toISOString() }
        ]
      }
    }));
  };

  const handleEditIncome = (editedIncome) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        incomeHistory: prevData[selectedMonth].incomeHistory.map(income =>
          income.date === editedIncome.date ? editedIncome : income
        )
      }
    }));
  };

  const handleDeleteIncome = (incomeToDelete) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        incomeHistory: prevData[selectedMonth].incomeHistory.filter(income => income.date !== incomeToDelete.date)
      }
    }));
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleExpandCard = (cardName) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardName]: !prev[cardName]
    }));
  };

  const handleUpdateCategoryBudget = (category, newBudget) => {
    setMonthlyData(prevData => ({
      ...prevData,
      [selectedMonth]: {
        ...prevData[selectedMonth],
        categoryBudgets: {
          ...(prevData[selectedMonth]?.categoryBudgets || {}),
          [category]: newBudget
        }
      }
    }));
  };

  const filteredExpenses = Object.entries(monthlyData).flatMap(([month, data]) => 
    data.expenses?.filter(expense => {
      const matchesSearch = expense.details.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
      const matchesMonth = filterMonth === "all" || month === filterMonth;
      return matchesSearch && matchesCategory && matchesMonth;
    }).map(expense => ({ ...expense, month })) || []
  ).sort((a, b) => {
    if (sortOrder === "desc") {
      return parseFloat(b.amount) - parseFloat(a.amount);
    } else {
      return parseFloat(a.amount) - parseFloat(b.amount);
    }
  });

  const totalSavings = currentMonthData.expenses?.filter(expense => expense.type === "savings")
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0) || 0;

  const totalExpenses = currentMonthData.expenses?.filter(expense => expense.type === "expense")
    .reduce((sum, expense) => sum + parseFloat(expense.amount), 0) || 0;

  return (
    <div className="min-h-screen p-4 bg-green-50 bg-opacity-90">
      <Header />
      <IncomeCard
        onSave={handleSaveIncome}
        currentIncome={currentMonthData.income}
        totalExpenses={totalExpenses}
        totalSavings={totalSavings}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        incomeHistory={currentMonthData.incomeHistory}
        onEditIncome={handleEditIncome}
        onDeleteIncome={handleDeleteIncome}
      />
      <div className="flex justify-center my-4 space-x-4">
        <ExpandableCard
          title="Ahorros"
          onAdd={handleAddExpense}
          categories={categories}
          totalAmount={totalSavings}
          isExpanded={expandedCards.Ahorros}
          onExpand={() => handleExpandCard('Ahorros')}
        />
        <ExpandableCard
          title="Gastos"
          onAdd={handleAddExpense}
          categories={categories}
          totalAmount={totalExpenses}
          isExpanded={expandedCards.Gastos}
          onExpand={() => handleExpandCard('Gastos')}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 my-4">
        {categories.filter(cat => cat !== "Ahorros").map((category, index) => (
          <CategoryCard
            key={index}
            title={category}
            expenses={currentMonthData.expenses?.filter(e => e.category === category) || []}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
            isExpanded={expandedCards[category]}
            onExpand={() => handleExpandCard(category)}
            totalBudget={currentMonthData.categoryBudgets?.[category] || 0}
            onUpdateBudget={(newBudget) => handleUpdateCategoryBudget(category, newBudget)}
          />
        ))}
      </div>
      <ExpensePieChart expenses={currentMonthData.expenses || []} />
      <Search onSearch={setSearchTerm} />
      <FilterControls
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        categories={categories}
        monthlyData={monthlyData}
      />
      <ExpenseTable
        filteredExpenses={filteredExpenses}
        categoryColors={categoryColors}
      />
      <Footer />
    </div>
  );
};

export default Index;
