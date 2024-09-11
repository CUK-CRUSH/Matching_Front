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
import LocationButton from '@/assets/Button/LocationButton.svg';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProgressBar from '@/utils/ProgressBar';

const queryClient = new QueryClient();

const LocationPage = () => {
  const { setCurrentPage } = useOnboardingStore();
  const { locationQuery, addressQuery } = useLocationData();

  const { register, setValue } = useForm({
    defaultValues: {
      address: '',
    },
  });

  useEffect(() => {
    if (addressQuery.data) {
      setValue('address', addressQuery.data, { shouldValidate: true });
    }
  }, [addressQuery.data, setValue]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-between h-screen">
        <div className="absolute w-full mt-2">
          <ProgressBar currentPage={5} totalPages={8} />
        </div>
        <div>
          <ValidationText
            titleTexts={['내 위치 등록']}
            descriptionTexts={['현재 거주하고 있는 지역을', '등록해주세요']}
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
                  className="h-11"
                  readOnly
                />

                <button
                  onClick={() => {
                    locationQuery.refetch();
                    addressQuery.refetch();
                  }}
                >
                  <img src={LocationButton} alt="locationButton" className="ml-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {addressQuery.data && (
          <div className="mt-4 flex justify-center">
            <div className="flex flex-col items-center text-sm font-bold text-center text-[#858585]">
              <ExclamationCircleOutlined className="mb-1" />
              <p>탐색된 내 위치가 정확한지 꼭 확인해주세요.</p>
              <p>알맞지 않은 경우, 버튼을 다시 눌러 다시 탐색해주세요.</p>
            </div>
          </div>
        )}
        {/* 현재 위치정보를 제대로 불러왔을 때만 넘어가도록 합니다. */}
        <div className="flex">
          <ValidationPrevButton onStateChange={() => setCurrentPage('sex')} />
          <ValidationButton
            onStateChange={() => setCurrentPage('nickname')}
            buttonEnabled={!!addressQuery.data}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default LocationPage;
