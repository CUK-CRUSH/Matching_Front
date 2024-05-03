import ValidationButton from '@/components/validation/validationButton';
import { useLocationData } from '@/services/GoogleLocation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const LocationPage = () => {
  const { locationQuery, addressQuery } = useLocationData();
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (
      !locationQuery.isLoading &&
      !locationQuery.isError &&
      !addressQuery.isLoading &&
      !addressQuery.isError &&
      locationQuery.data &&
      addressQuery.data
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [locationQuery, addressQuery]);
  // 위도 경도 데이터 보낼때 => locationQuery.data?.lat.toFixed(6), locationQuery.data?.lng.toFixed(6)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between h-screen">
        <div className="p-2 text-center">
          {locationQuery.isLoading ? (
            '위치 정보를 가져오는 중입니다...'
          ) : locationQuery.isError ? (
            <p> {locationQuery.error.message}</p>
          ) : (
            <p>주소: {addressQuery.isLoading ? '주소를 불러오는 중...' : addressQuery.data}</p>
          )}
        </div>
        <button
          onClick={() => {
            locationQuery.refetch();
            addressQuery.refetch();
          }}
          className="m-2 p-2 bg-blue-500 text-white"
        >
          현재 위치 찾기
        </button>
        {/* 현재 위치정보를 제대로 불러왔을떄만 넘어가도록 한다. */}
        <ValidationButton navigation="/matching" buttonEnabled={buttonEnabled} />
      </div>
    </QueryClientProvider>
  );
};

export default LocationPage;
