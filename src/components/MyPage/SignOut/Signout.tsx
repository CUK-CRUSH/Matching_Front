import MatchingListHeader from '@/components/layout/matchingListHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ValidationText from '@/components/validation/validationText';
import UseAccessToken from '@/hooks/useAccessToken';
import { postWithdrawal } from '@/services/Mypage/MypageAPI';
import useMyPageStore from '@/store/myPageStore';
import CommonModal from '@/utils/CommonModal';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignOutPage = () => {
  const { setCurrentPage } = useMyPageStore();
  const accessToken = UseAccessToken();

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      reason: '',
    },
  });
  const [, , removeCookie] = useCookies(['accessToken']);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: { reason: string }) => {
    setLoading(true);
    try {
      await postWithdrawal(accessToken, data.reason);
      toast.success('계정이 성공적으로 삭제되었습니다.');

      // Clear tokens
      removeCookie('accessToken', { path: '/' });
      localStorage.removeItem('refreshToken');
      toast.success('로그아웃 되었습니다.');

      window.location.href = '/login'; // 로그인 페이지로 이동
    } catch (error) {
      console.error('Failed to delete account:', error);
      toast.error('계정 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const reason = watch('reason');
  const isButtonEnabled = reason.trim().length > 0;
  return (
    <div className="text-white h-full flex flex-col justify-between items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col">
        <MatchingListHeader
          text="회원 탈퇴"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 나의 Duett"
          background="#252525"
        />
        <ValidationText
          titleTexts={['계정 탈퇴']}
          descriptionTexts={[
            '계정이 삭제될 경우',
            '기존의 계정 정보는 즉시 삭제되어',
            '이후에는 복구할 수 없어요.',
          ]}
          marginTop="2rem"
        />
        <div className="mt-8 mx-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="계정을 삭제하려는 이유를 알려주세요"
                  {...field}
                  className="h-11 bg-black text-white"
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto p-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant={'noHover'}
          className={`w-full text-l rounded-3xl mx-auto ${isButtonEnabled ? 'bg-white text-black' : 'bg-gray-500 text-gray-300 cursor-not-allowed'}`}
          disabled={!isButtonEnabled || loading}
        >
          {loading ? '처리 중...' : 'Duett 계정 삭제하기'}
        </Button>
        {isModalOpen && (
          <CommonModal
            mainText="계정을 삭제하시겠습니까?"
            subText="계정 삭제시, 이전의 모든 데이터는 복구할 수 없게 됩니다"
            cancelText="취소"
            confirmText="확인"
            onCancel={() => setIsModalOpen(false)} // 모달 닫기
            onConfirm={handleSubmit(onSubmit)} // 삭제 진행
          />
        )}
      </div>
    </div>
  );
};

export default SignOutPage;
