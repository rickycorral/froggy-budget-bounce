import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const IncomeCard = ({ onSave }) => {
  const [income, setIncome] = useState('');

  const handleSave = () => {
    onSave(income);
    setIncome('');
  };

  return (
    <Card className="w-full bg-green-100 border-green-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Income</span>
          {income && <span className="text-green-600">${income}</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Enter income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="border-green-300 focus:border-green-500"
          />
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};