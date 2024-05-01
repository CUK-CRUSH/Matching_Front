import { it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Example2 from '@/pages/example2/index';

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
        <Example2 />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const productName = screen.getByText(/한화/);
      expect(productName).toBeInTheDocument();
    });
  });
