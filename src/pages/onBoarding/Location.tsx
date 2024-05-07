import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
import { useLocationData } from '@/services/GoogleLocation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const LocationPage = () => {
  const { locationQuery, addressQuery } = useLocationData();
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [addressInput, setAddressInput] = useState('');

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
      setAddressInput(addressQuery.data);
    } else {
      setButtonEnabled(false);
    }
  }, [locationQuery, addressQuery]);
  // 위도 경도 데이터 보낼때 => locationQuery.data?.lat.toFixed(6), locationQuery.data?.lng.toFixed(6)
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between h-screen">
        <div>
          <ValidationText
            titleTexts={['거주지역']}
            descriptionTexts={['현재 거주하고 있는 지역을', '선택해주세요']}
          />
          <div className="mt-16 mx-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="kakaoIdConfirm">주소</Label>
              <div className="flex flex-row">
                <Input
                  type="text"
                  id="address"
                  placeholder="주소를 자동으로 불러옵니다."
                  value={addressInput}
                  readOnly
                />
                <button
                  onClick={() => {
                    locationQuery.refetch();
                    addressQuery.refetch();
                  }}
                >
                  🔍
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 현재 위치정보를 제대로 불러왔을떄만 넘어가도록 한다. */}
        <ValidationButton navigation="/matching" buttonEnabled={buttonEnabled} />
      </div>
    </QueryClientProvider>
  );
};

export default LocationPage;
