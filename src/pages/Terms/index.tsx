import Logo from '@/assets/Home/Logo.svg';
import TermsCheckBox from '@/components/terms/checkBox';
import { ScrollArea } from '@/components/ui/scroll-area';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
import { TermsOfUseWords, PrivacyWords } from '@/fixture/termsofuse';
import { useCallback, useEffect, useState } from 'react';

const TermsPage = () => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [signinChecked, setSigninChecked] = useState<boolean>(false);
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);
  const [smsChecked, setSmsChecked] = useState<boolean>(false);

  const checkAllCondition = useCallback(() => {
    const all = signinChecked && privacyChecked && smsChecked;
    setAllChecked(all);
  }, [signinChecked, privacyChecked, smsChecked]);

  const handleAllCheckedChange = useCallback((checked: boolean) => {
    setAllChecked(checked);
    setSigninChecked(checked);
    setPrivacyChecked(checked);
    setSmsChecked(checked);
  }, []);

  const handleSigninCheckedChange = useCallback(
    (checked: boolean) => {
      setSigninChecked(checked);
      checkAllCondition();
    },
    [checkAllCondition],
  );

  const handlePrivacyCheckedChange = useCallback(
    (checked: boolean) => {
      setPrivacyChecked(checked);
      checkAllCondition();
    },
    [checkAllCondition],
  );

  const handleSmsCheckedChange = useCallback(
    (checked: boolean) => {
      setSmsChecked(checked);
      checkAllCondition();
    },
    [checkAllCondition],
  );

  useEffect(() => {
    if (signinChecked && privacyChecked && smsChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [signinChecked, privacyChecked, smsChecked]);

  const buttonEnabled = signinChecked && privacyChecked;

  return (
    <div className="flex flex-col justify-between h-screen mx-4">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center mt-10">
        <img src={Logo} alt="logo" className="self-center w-16" />
      </div>
      <ValidationText titleTexts={['이용약관 및 개인정보 처리방침']} />
      <div className="border-b text-black font-bold pb-4 border-b-[#C6C6C6]">
        <TermsCheckBox
          id="all"
          label="회원가입 약관에 모두 동의합니다."
          checked={allChecked}
          onChange={handleAllCheckedChange}
        />
      </div>
      <div>
        <div className="flex flex-row justify-between mb-3">
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
          <ScrollArea className="h-[100px] w-[380px] text-sm rounded-md border p-4">
            <TermsOfUseWords />
          </ScrollArea>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between mb-3">
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
          <ScrollArea className="h-[100px] w-[380px] text-sm rounded-md border p-4">
            <PrivacyWords />
          </ScrollArea>
        </div>
      </div>
      <div>
        <div className="text-sm">
          <p>마케팅 활용 동의 및 광고 수신 동의</p>
          <p>서비스와 관련된 소식, 이벤트 안내, 고객 혜택등 정보를 제공합니다.</p>
          <TermsCheckBox
            id="sms"
            label="SMS 수신 동의 (선택)"
            checked={smsChecked}
            onChange={handleSmsCheckedChange}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <ValidationButton rounded={false} navigation="/login" buttonEnabled={buttonEnabled} />
      </div>
    </div>
  );
};

export default TermsPage;
