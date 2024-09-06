import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

export const ExpandableCard = ({ title, onAdd, categories, totalAmount, isExpanded, onExpand }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.toLowerCase() === 'ahorros') {
      onAdd({ date: date ? format(date, 'yyyy-MM-dd') : '', amount, details, type: 'savings' });
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      onAdd({ date: date ? format(date, 'yyyy-MM-dd') : '', amount, details, category, type: 'expense' });
    }
    setDate('');
    setAmount('');
    setDetails('');
    setCategory('');
    onExpand();
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsCalendarOpen(false);
  };

  const cardColor = title.toLowerCase() === 'ahorros' ? 'bg-teal-400' : 'bg-orange-400';

  return (
    <motion.div 
      className="flex justify-center w-full"
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-60 bg-white bg-opacity-90 border-green-300 shadow-lg">
              <CardHeader>
                <CardTitle className="flex justify-center items-center">
                  <Button
                    className="w-full rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm"
                    onClick={onExpand}
                  >
                    {title}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal text-xs",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
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
                    className="border-green-300 focus:border-green-500 text-xs"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <Input
                    placeholder="Detalles"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                    className="border-green-300 focus:border-green-500 text-xs"
                  />
                  {title.toLowerCase() !== 'ahorros' && (
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger className="border-green-300 focus:border-green-500 text-xs">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white text-xs w-full">Agregar</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className={`w-20 h-20 ${cardColor} rounded-full flex flex-col items-center justify-center text-white hover:bg-opacity-90`}
              onClick={onExpand}
            >
              <PlusCircle className="h-6 w-6 mb-1" />
              <span className="text-xs font-bold">{title}</span>
              <span className="text-xxs font-semibold">${totalAmount.toFixed(2)}</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};