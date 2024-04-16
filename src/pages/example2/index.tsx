import { useQuery } from '@tanstack/react-query';
import { getPerson } from './myapi';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const useFetchPersonalInfo = () => {
  return useQuery({
    queryKey: ['personData'],
    queryFn: () => getPerson(),
  });
};

export default function Example2() {
  const { data, isPending, error } = useFetchPersonalInfo();

  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Function to decrement the count
  const handleDecrement = () => {
    setCount(count - 1);
  };
  if (isPending) return 'Loading...';
  if (error) {
    const errorMessage = error?.message || 'Unknown error';
    return 'An error has occurred: ' + errorMessage;
  }

  return (
    <div>
      <h2>Todos:</h2>

      <h2>Personal Info:</h2>
      <div>
        <h1>{data.productName}</h1>
      </div>
      <div>
        <Button onClick={handleDecrement}>-</Button>
        <span>{count}</span>
        <Button onClick={handleIncrement}>+</Button>
      </div>
    </div>
  );
}
