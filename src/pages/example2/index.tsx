import { useQuery } from '@tanstack/react-query';
import { getPerson } from './myapi';

export default function Example2() {
  const personQuery = useQuery({
    queryKey: ['personData'],
    queryFn: () => getPerson(),
  });

  if (personQuery.isPending) return 'Loading...';
  if (personQuery.error) {
    const errorMessage = personQuery.error?.message || 'Unknown error';
    return 'An error has occurred: ' + errorMessage;
  }

  return (
    <div>
      <h2>Todos:</h2>

      <h2>Personal Info:</h2>
      <div>
        <h1>{personQuery.data.productName}</h1>
      </div>
    </div>
  );
}
