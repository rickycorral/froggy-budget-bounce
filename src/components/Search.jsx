import React from 'react';
import { Input } from "@/components/ui/input";

export const Search = ({ onSearch }) => {
  return (
    <Input
      type="text"
      placeholder="Buscar gastos..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full text-sm"
    />
  );
};