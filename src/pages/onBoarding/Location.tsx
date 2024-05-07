import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import { useLocationData } from '@/services/GoogleLocation';
import useOnboardingStore from '@/store/validationStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const queryClient = new QueryClient();

const LocationPage = () => {
  const { setCurrentPage, userData } = useOnboardingStore();
  const { locationQuery, addressQuery } = useLocationData();

  const { register, setValue } = useForm({
    defaultValues: {
      address: userData.address || '',
    },
  });

  useEffect(() => {
    if (userData.address) {
      setValue('address', userData.address, { shouldValidate: true });
    }
  }, [userData.address, setValue]);

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
                  {...register('address')}
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
        <div className="flex">
          <ValidationPrevButton onStateChange={() => setCurrentPage('sex')} />
          <ValidationButton
            onStateChange={() => setCurrentPage('nickname')}
            buttonEnabled={!!userData.address}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default LocationPage;
