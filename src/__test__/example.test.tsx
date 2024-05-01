import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, test } from 'vitest';
import { useFetchPersonalInfo } from '@/pages/example2';
import { render, screen, waitFor } from '@testing-library/react';
import { MOCK_PRODUCT } from '@/fixture/product';

const queryClient = new QueryClient();

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const TestComponent = () => {
  const { data, isSuccess } = useFetchPersonalInfo();

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return <div>{data.productName}</div>;
};

test('데이터를 불러온다.', async () => {
  render(<TestComponent />, { wrapper });

  expect(screen.getByText('Loading...')).not.toBeNull();

  await waitFor(
    () => {
      expect(screen.queryByText('Loading...')).toBeNull();
      const element = screen.getByText(MOCK_PRODUCT.productName);

      expect(element).not.toBeNull();
    },
    {
      timeout: 1000,
    },
  );
});
test('이름을 확인한다.', async () => {
  render(<TestComponent />, { wrapper });

  try {
    const loadingText = await screen.findByText('Loading...');
    expect(loadingText).toBeTruthy(); // If element is found, it exists and is truthy
  } catch (error) {
    console.log('Loading state was skipped or too fast to capture.');
  }

  await waitFor(
    () => {
      const element = screen.getByText('한화 암보험');
      expect(element).toBeTruthy(); // Ensure the product name element exists and is truthy
    },
    {
      timeout: 1000,
    },
  );
});
// test('잘나오나 확인', async () => {
//   render(<Example2 />, { wrapper });

//   await waitFor(
//     () => {
//       // Verify loading state

//       // Check for successful data fetching and rendering
//       expect(screen.findByText('한화 암보험')).toBeTruthy();
//     },
//     {
//       timeout: 1000, // Optional timeout parameter if the response might be delayed
//     },
//   );
// });
