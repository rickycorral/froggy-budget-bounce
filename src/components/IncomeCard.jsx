import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const IncomeCard = ({ onSave, currentIncome }) => {
  const [income, setIncome] = useState('');

  const handleSave = () => {
    onSave(income);
    setIncome('');
  };

  return (
    <Card className="w-full bg-white bg-opacity-80 border-green-300 shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-sm">
          <span>Ingresos</span>
          <span className="text-green-600">${currentIncome}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Ingresar ingresos"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border-green-300 focus:border-green-500 text-sm"
          />
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white text-sm">Guardar</Button>
        </div>
      </CardContent>
    </Card>
  );
};