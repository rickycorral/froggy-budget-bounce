import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ExpandableCard = ({ title, onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ date, amount, details, type: title.toLowerCase() });
    setDate('');
    setAmount('');
    setDetails('');
  };

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>
          <Button
            className="w-full rounded-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {title}
          </Button>
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
            />
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Input
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
};