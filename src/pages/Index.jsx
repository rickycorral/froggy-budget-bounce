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
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";

const Index = () => {
  const [monthlyData, setMonthlyData] = useState({});
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
    const monthlyDataRef = ref(db, 'monthlyData');
    onValue(monthlyDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMonthlyData(data);
      }
    });
  }, []);

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
    const updatedData = {
      ...monthlyData,
      [selectedMonth]: {
        ...monthlyData[selectedMonth],
        expenses: [...(monthlyData[selectedMonth]?.expenses || []), { ...expense, id: Date.now() }]
      }
    };
    set(ref(db, 'monthlyData'), updatedData);
  };

  const handleEditExpense = (editedExpense) => {
    const updatedData = {
      ...monthlyData,
      [selectedMonth]: {
        ...monthlyData[selectedMonth],
        expenses: monthlyData[selectedMonth].expenses.map(expense =>
          expense.id === editedExpense.id ? editedExpense : expense
        )
      }
    };
    set(ref(db, 'monthlyData'), updatedData);
  };

  const handleDeleteExpense = (expenseToDelete) => {
    const updatedData = {
      ...monthlyData,
      [selectedMonth]: {
        ...monthlyData[selectedMonth],
        expenses: monthlyData[selectedMonth].expenses.filter(expense => expense.id !== expenseToDelete.id)
      }
    };
    set(ref(db, 'monthlyData'), updatedData);
  };

  const handleSaveIncome = (newIncome) => {
    const updatedData = {
      ...monthlyData,
      [selectedMonth]: {
        ...monthlyData[selectedMonth],
        income: newIncome,
        incomeHistory: [
          ...(monthlyData[selectedMonth]?.incomeHistory || []),
          { amount: newIncome, date: new Date().toISOString() }
        ]
      }
    };
    set(ref(db, 'monthlyData'), updatedData);
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
    const updatedData = {
      ...monthlyData,
      [selectedMonth]: {
        ...monthlyData[selectedMonth],
        categoryBudgets: {
          ...(monthlyData[selectedMonth]?.categoryBudgets || {}),
          [category]: newBudget
        }
      }
    };
    set(ref(db, 'monthlyData'), updatedData);
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
      <div className="max-w-md mx-auto mb-4">
        <IncomeCard
          onSave={handleSaveIncome}
          currentIncome={currentMonthData.income}
          totalExpenses={totalExpenses}
          totalSavings={totalSavings}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          incomeHistory={currentMonthData.incomeHistory}
        />
      </div>
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
      <div className="mb-4 space-y-2">
        <Search onSearch={setSearchTerm} />
        <div className="flex space-x-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Mayor a menor</SelectItem>
              <SelectItem value="asc">Menor a mayor</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los meses</SelectItem>
              {Object.keys(monthlyData).map((month) => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-2xl mx-auto bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((expense, index) => (
              <tr key={index} className={`hover:bg-gray-50 ${categoryColors[expense.category] || 'bg-green-100'} bg-opacity-20`}>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.details}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.category || "Ahorros"}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">${expense.amount}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">{expense.month}</td>
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
