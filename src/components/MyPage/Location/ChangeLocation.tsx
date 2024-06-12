import { Input } from '@/components/ui/input';
import ValidationText from '@/components/validation/validationText';
import { useLocationData } from '@/services/GoogleLocation';
import { useForm } from 'react-hook-form';
import LocationButton from '@/assets/Button/LocationButton.svg';
import { useEffect } from 'react';
import MatchingListHeader from '@/components/layout/matchingListHeader';
import useMyPageStore from '@/store/myPageStore';

const ChangeLocationPage = () => {
  const { locationQuery, addressQuery } = useLocationData();

  const { setCurrentPage } = useMyPageStore();

  const { register, setValue } = useForm({
    defaultValues: {
      address: '',
    },
  });

  useEffect(() => {
    if (addressQuery.data) {
      setValue('address', addressQuery.data);
      console.log(addressQuery);
      console.log(locationQuery.data?.lat);
      console.log(locationQuery.data?.lng);
    }
  }, [addressQuery.data, setValue]);

  return (
    <div className="text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <MatchingListHeader
          text="내 위치 관리"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 프로필 수정"
        />
        <div>
          <ValidationText
            titleTexts={['내 위치 등록']}
            descriptionTexts={[
              '현재의 위치를 기반으로',
              '내 거주지 정보가 수정됩니다.',
              '오른쪽 벝능르 눌러 주소를 검색합니다.',
            ]}
            titleTextColor="#ffffff"
          />
          <div className="mt-16 mx-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex flex-row">
                <Input
                  type="text"
                  id="address"
                  placeholder="주소를 자동으로 불러옵니다."
                  {...register('address')}
                  className="h-11 bg-black text-white"
                  readOnly
                />

                <button
                  onClick={() => {
                    locationQuery.refetch();
                    addressQuery.refetch();
                  }}
                  className="ml-2 "
                >
                  <img src={LocationButton} alt="locationButton" className="h-11 " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLocationPage;
