import BlurLogo from '@/assets/Home/BlurLogo.svg';
import TermsCheckBox from '@/components/terms/checkBox';
import { ScrollArea } from '@/components/ui/scroll-area';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
import { TermsOfUseWords, PrivacyWords } from '@/fixture/termsofuse';
import useTermsStore from '@/store/TermStore';
import { useCallback, useEffect } from 'react';

const TermsPage = () => {
  const {
    allChecked,
    signinChecked,
    privacyChecked,
    smsChecked,
    setAllChecked,
    setSigninChecked,
    setPrivacyChecked,
    setSmsChecked,
    checkAllCondition,
  } = useTermsStore();

  useEffect(() => {
    checkAllCondition();
  }, [signinChecked, privacyChecked, smsChecked, checkAllCondition]);

  const handleAllCheckedChange = useCallback(
    (checked: boolean) => {
      setAllChecked(checked);
    },
    [setAllChecked],
  );

  const handleSigninCheckedChange = useCallback(
    (checked: boolean) => {
      setSigninChecked(checked);
    },
    [setSigninChecked],
  );

  const handlePrivacyCheckedChange = useCallback(
    (checked: boolean) => {
      setPrivacyChecked(checked);
    },
    [setPrivacyChecked],
  );

  const handleSmsCheckedChange = useCallback(
    (checked: boolean) => {
      setSmsChecked(checked);
    },
    [setSmsChecked],
  );

  const buttonEnabled = signinChecked && privacyChecked;

  return (
    <div className="flex flex-col justify-between relative h-screen mx-4">
      <div className="absolute left-[10%] top-12 transform -translate-x-1/2 flex items-center justify-center mt-10">
        <img src={BlurLogo} alt="BlurLogo" className="self-center w-16" />
      </div>
      <ValidationText titleTexts={['이용약관 및 개인정보 처리방침']} />
      <div className="border-b font-bold py-4">
        <TermsCheckBox
          id="all"
          label="회원가입 약관에 모두 동의합니다."
          checked={allChecked}
          onChange={handleAllCheckedChange}
        />
      </div>
      <div className="mx-2 mt-8 flex-grow">
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-1">
            <div className="flex font-bold flex-row justify-between mb-3">
              <TermsCheckBox
                id="signin"
                label="이용약관"
                checked={signinChecked}
                onChange={handleSigninCheckedChange}
                required
              />
              <p className="text-[#E65E6F] text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                필수항목
              </p>
            </div>
            <div className="flex justify-center">
              <ScrollArea className="h-[100px] w-full max-w-md text-sm rounded-md border p-4">
                <TermsOfUseWords />
              </ScrollArea>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex font-bold flex-row justify-between mb-3">
              <TermsCheckBox
                id="privacy"
                label="개인정보처리방침"
                checked={privacyChecked}
                onChange={handlePrivacyCheckedChange}
                required
              />
              <p className="text-[#E65E6F] text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                필수항목
              </p>
            </div>
            <div className="flex justify-center">
              <ScrollArea className="h-[100px] w-full max-w-md text-sm rounded-md border p-4">
                <PrivacyWords />
              </ScrollArea>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm mb-3">
            <p>마케팅 활용 동의 및 광고 수신 동의</p>
            <p>서비스와 관련된 새로운 소식, 이벤트 안내, 고객 혜택 등 다양한 정보를</p>
            <p>제공합니다.</p>
          </div>
          <div className="font-bold">
            <TermsCheckBox
              id="sms"
              label="광고성 SMS 수신 동의 (선택)"
              checked={smsChecked}
              onChange={handleSmsCheckedChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <ValidationButton rounded={false} navigation="/login" buttonEnabled={buttonEnabled} />
      </div>
    </div>
  );
};

export default TermsPage;
