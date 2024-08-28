import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const IncomeCard = () => {
  const [income, setIncome] = useState('');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Income</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Enter income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <Button>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};