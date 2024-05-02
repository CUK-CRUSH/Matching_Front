import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileCard from '@/components/ui/profileCard/profileCard';

describe('ModalWithProfileCard', () => {
  test('버튼 클릭시 모달창 띄우기', async () => {
    render(<ProfileCard />);

    // 클릭하기 전에는 Modal 텍스트가 보이지 않아야 함
    expect(screen.queryByTestId('modalText')).toBeNull();

    // img 클릭 alt text로 접근
    await userEvent.click(screen.getByAltText('lock'));

    // 잠금해제하고 더 읽기 로 접근
    await userEvent.click(screen.getByText('잠금해제하고 더 읽기')); 

    // img 클릭 후 Modal 텍스트가 보이는지 확인
    expect(screen.getByTestId('modalText')).toHaveTextContent('프로필 잠금을 해제할까요?');
    expect(screen.getByTestId('modalText')).toHaveTextContent(`'2' 재화를 소모합니다.`);

  });
});
