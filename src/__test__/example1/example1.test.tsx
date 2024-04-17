import { it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Example from '@/pages/example/index';

  it('API 호출', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const name = screen.getByText(/q/);
      expect(name).toBeInTheDocument();
      const description = screen.getByText(/🤖/);
      expect(description).toBeInTheDocument();
    });
  });
