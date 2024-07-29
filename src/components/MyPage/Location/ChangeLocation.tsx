import { Input } from '@/components/ui/input';
import ValidationText from '@/components/validation/validationText';
import { useLocationData } from '@/services/GoogleLocation';
import { useForm } from 'react-hook-form';
import LocationButton from '@/assets/Button/LocationButton.svg';
import { useEffect } from 'react';
import MatchingListHeader from '@/components/layout/matchingListHeader';
import useMyPageStore from '@/store/myPageStore';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { patchUserLocationData } from '@/services/Mypage/MypageAPI';
import UseAccessToken from '@/hooks/useAccessToken';

const ChangeLocationPage = () => {
  const { locationQuery, addressQuery } = useLocationData();
  const { setCurrentPage } = useMyPageStore();
  const accessToken = UseAccessToken();

  const { register, setValue, handleSubmit } = useForm({
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

  const onSubmit = async () => {
    const lat = locationQuery.data?.lat;
    const lng = locationQuery.data?.lng;

    if (lat === undefined || lng === undefined) {
      alert('위치 정보를 불러오지 못했습니다. 다시 시도해주세요.');
      return;
    }

    try {
      await patchUserLocationData([lat, lng], accessToken);
      setCurrentPage('mypage');
    } catch (error) {
      console.error('Failed to update location:', error);
      alert('Failed to update location. Please try again.');
    }
  };

  return (
    <div className="text-white h-full flex flex-col justify-between items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <MatchingListHeader
          text="내 위치 관리"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 프로필 수정"
        />
        <div className="mx-2">
          <ValidationText
            titleTexts={['현재의 위치를 기반으로', '내 거주지 정보가 수정됩니다.']}
            descriptionTexts={['오른쪽 버튼을 눌러 주소를 검색합니다.']}
            titleTextColor="#ffffff"
            marginTop="2rem"
          />
          <div className="mt-16 mx-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <div className="flex flex-row">
                <Input
                  type="text"
                  id="address"
                  placeholder="주소를 자동으로 불러옵니다."
                  {...register('address')}
                  className="h-11 bg-black text-white border-none"
                  readOnly
                />
                <div className="flex items-center justify-center ml-2">
                  <button
                    onClick={() => {
                      locationQuery.refetch();
                      addressQuery.refetch();
                    }}
                  >
                    <img src={LocationButton} alt="locationButton" className="h-13" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto p-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-white text-l text-black rounded-3xl my-2 py-2"
          variant={'noHover'}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default ChangeLocationPage;
