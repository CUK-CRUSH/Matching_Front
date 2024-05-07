import TermsCheckBox from '@/components/terms/checkBox';
import { ScrollArea } from '@/components/ui/scroll-area';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
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
      <ValidationText titleTexts={['DUETT 이용약관 및 개인정보 처리방침']} />
      <TermsCheckBox
        id="all"
        label="회원가입 약관에 모두 동의합니다."
        checked={allChecked}
        onChange={handleAllCheckedChange}
      />
      <div>
        <TermsCheckBox
          id="signin"
          label="회원가입약관"
          checked={signinChecked}
          onChange={handleSigninCheckedChange}
          required
        />
        <div className="flex justify-center">
          <ScrollArea className="h-[100px] w-[380px] text-sm rounded-md border p-4">
            Jokester began sneaking into the castle in the middle of the night and leaving jokes all
            over the place: under the king's pillow, in his soup, even in the royal toilet. The king
            was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the
            kingdom discovered that the jokes left by Jokester were so funny that they couldn't help
            but laugh. And once they started laughing, they couldn't stop.
          </ScrollArea>
        </div>
      </div>
      <div>
        <TermsCheckBox
          id="privacy"
          label="개인정보처리방침"
          checked={privacyChecked}
          onChange={handlePrivacyCheckedChange}
          required
        />

        <div className="flex justify-center">
          <ScrollArea className="h-[100px] w-[380px] text-sm rounded-md border p-4">
            Jokester began sneaking into the castle in the middle of the night and leaving jokes all
            over the place: under the king's pillow, in his soup, even in the royal toilet. The king
            was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the
            kingdom discovered that the jokes left by Jokester were so funny that they couldn't help
            but laugh. And once they started laughing, they couldn't stop.
          </ScrollArea>
        </div>
      </div>
      <p>마케팅 활용 동의 및 광고 수신 동의</p>
      <p>서비스와 관련된 소식, 이벤트 안내, 고객 혜택등 정보를 제공합니다.</p>
      <TermsCheckBox
        id="sms"
        label="SMS 수신 동의"
        checked={smsChecked}
        onChange={handleSmsCheckedChange}
      />

      <ValidationButton navigation="/login" buttonEnabled={buttonEnabled} />
    </div>
  );
};

export default TermsPage;
