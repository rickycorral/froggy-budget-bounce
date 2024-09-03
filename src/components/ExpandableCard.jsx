import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ExpandableCard = ({ title, onAdd, categories, totalAmount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.toLowerCase() === 'ahorros') {
      onAdd({ date, amount, details, type: 'savings' });
    } else {
      onAdd({ date, amount, details, category, type: 'expense' });
    }
    setDate('');
    setAmount('');
    setDetails('');
    setCategory('');
  };

  return (
    <Card className={`w-full sm:w-1/2 ${isExpanded ? 'bg-white bg-opacity-80' : 'bg-green-500'} border-green-300 shadow-lg transition-all duration-300 ease-in-out ${isExpanded ? '' : 'rounded-full h-24 w-24 flex items-center justify-center mx-auto'}`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <Button
            className={`w-full rounded-full ${isExpanded ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-transparent text-white hover:bg-green-600'} text-sm`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? title : title}
          </Button>
          {isExpanded && <span className="text-green-700 font-bold ml-2 text-sm">${totalAmount.toFixed(2)}</span>}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border-green-300 focus:border-green-500 text-sm"
            />
            <Input
              type="number"
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-green-300 focus:border-green-500 text-sm"
            />
            <Input
              placeholder="Detalles"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="border-green-300 focus:border-green-500 text-sm"
            />
            {title.toLowerCase() !== 'ahorros' && (
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="border-green-300 focus:border-green-500 text-sm">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white text-sm">Agregar</Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
};