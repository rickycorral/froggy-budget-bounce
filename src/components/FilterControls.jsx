import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ArrowUpDown, Calendar } from "lucide-react";

export const FilterControls = ({
  categoryFilter,
  setCategoryFilter,
  sortOrder,
  setSortOrder,
  filterMonth,
  setFilterMonth,
  categories,
  monthlyData
}) => {
  return (
    <div className="flex space-x-2 mb-4">
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
  );
};