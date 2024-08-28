import React from 'react';
import { Input } from "@/components/ui/input";

export const Search = ({ onSearch }) => {
  return (
    <Input
      type="text"
      placeholder="Search expenses..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full"
    />
  );
};