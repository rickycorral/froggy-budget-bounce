import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const ExpandableCard = ({ title, onAdd, categories, totalAmount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const cardRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === cardRef.current) {
          // Handle resize here if needed
        }
      }
    });

    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        resizeObserver.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.toLowerCase() === 'ahorros') {
      onAdd({ date: date ? format(date, 'yyyy-MM-dd') : '', amount, details, type: 'savings' });
    } else {
      onAdd({ date: date ? format(date, 'yyyy-MM-dd') : '', amount, details, category, type: 'expense' });
    }
    setDate('');
    setAmount('');
    setDetails('');
    setCategory('');
  };

  return (
    <motion.div 
      className="flex justify-center w-full"
      whileTap={{ scale: 0.95 }}
    >
      <Card 
        ref={cardRef}
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-full sm:w-96 bg-white bg-opacity-80' : 'w-48 h-48 rounded-full bg-green-500 flex items-center justify-center'
        } border-green-300 shadow-lg`}
      >
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            <Button
              className={`w-full ${
                isExpanded ? 'rounded-lg bg-green-500 hover:bg-green-600 text-white' : 'rounded-full bg-transparent text-white hover:bg-green-600'
              } text-sm`}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? title : title}
            </Button>
            {isExpanded && <span className="text-green-700 font-bold ml-2 text-sm">${totalAmount.toFixed(2)}</span>}
          </CardTitle>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="number"
                placeholder="Monto"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="border-green-300 focus:border-green-500 text-sm"
                inputMode="numeric"
                pattern="[0-9]*"
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
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white text-sm w-full">Agregar</Button>
            </form>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};