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
    if (title.toLowerCase() === 'savings') {
      onAdd({ date, amount, details, type: 'savings' });
    } else {
      onAdd({ date, amount, details, category, type: title.toLowerCase() });
    }
    setDate('');
    setAmount('');
    setDetails('');
    setCategory('');
  };

  return (
    <Card className="w-full md:w-1/3 bg-green-100 border-green-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <Button
            className="w-full rounded-full bg-green-500 hover:bg-green-600 text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {title}
          </Button>
          <span className="text-green-700 font-bold ml-2">${totalAmount.toFixed(2)}</span>
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
              className="border-green-300 focus:border-green-500"
            />
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="border-green-300 focus:border-green-500"
            />
            <Input
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              className="border-green-300 focus:border-green-500"
            />
            {title.toLowerCase() !== 'savings' && (
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="border-green-300 focus:border-green-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">Add</Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
};