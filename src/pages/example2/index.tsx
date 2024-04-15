import { useQuery } from '@tanstack/react-query';
import { getPerson, getTodos } from './myapi';

export default function Example2() {
  const todosQuery = useQuery({
    queryKey: ['todosData'],
    queryFn: () => getTodos(),
  });
  const personQuery = useQuery({
    queryKey: ['personData'],
    queryFn: () => getPerson(),
  });

  if (todosQuery.isPending || personQuery.isPending) return 'Loading...';
  if (todosQuery.error || personQuery.error) {
    const errorMessage = todosQuery.error
      ? todosQuery.error.message
      : personQuery.error?.message || 'Unknown error';
    return 'An error has occurred: ' + errorMessage;
  }

  return (
    <div>
      <h2>Todos:</h2>
      {todosQuery.data.map((todo: any) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
        </div>
      ))}

      <h2>Personal Info:</h2>
      <div>
        <h1>{personQuery.data.productName}</h1>
      </div>
    </div>
  );
}
