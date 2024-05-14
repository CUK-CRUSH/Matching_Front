import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileCard from '@/pages/matching/index';

// 'ModalWithProfileCard'를 describe 블록으로 묶어줍니다.
describe('ProfileCard.unlockButton.test', () => {
  // 첫 번째 테스트 케이스: 버튼 클릭 시 모달창 띄우기
  test('버튼 클릭시 모달창 띄우기', async () => {
    render(<ProfileCard />);

    // 클릭하기 전에는 Modal 텍스트가 보이지 않아야 함
    expect(screen.queryByTestId('unlockModalText')).toBeNull();

    // img 접근 후 alt 'lock' 에 접근 후 버튼 클릭
    await act(async () => {
      const lockImage = await screen.findByRole('img', { name: 'lock' })
      await userEvent.click(lockImage);
    })

    // 잠금해제하고 더 읽기 로 접근
    await act(async () => {
      await userEvent.click(screen.getByText('잠금해제하고 더 읽기'));
    })

    // img 클릭 후 Modal 텍스트가 보이는지 확인
    expect(screen.getByTestId('unlockModalText')).toHaveTextContent(`프로필 잠금을 해제할까요?'2' 재화를 소모합니다.취소확인`);
    // expect(screen.getByTestId('unlockModalText')).toHaveTextContent('2 재화를 소모합니다.');
  });

  // 두 번째 테스트 케이스: 버튼 클릭시 모달창 나오고 취소 버튼을 클릭하면 모달창이 꺼짐
  it('버튼 클릭시 모달창 나오고 취소 버튼을 클릭하면 모달창이 꺼짐', async () => {
    render(<ProfileCard />);

    // 초기에 모달이 보이지 않는지 확인
    expect(screen.queryByTestId('unlockModalText')).toBeNull();

    // img 접근 후 alt 'lock' 에 접근 후 버튼 클릭
    await act(async () => {
      const lockImage = await screen.findByRole('img', { name: 'lock' })
      await userEvent.click(lockImage);
    })

    // 잠금해제하고 더 읽기 로 접근
    await act(async () => {
      await userEvent.click(screen.getByText('잠금해제하고 더 읽기'));
    })

    // 모달이 정상적으로 열렸는지 확인
    expect(screen.getByTestId('unlockModalText')).toHaveTextContent('프로필 잠금을 해제할까요?');
    expect(screen.getByTestId('unlockModalText')).toHaveTextContent(`'2' 재화를 소모합니다.`);

    // 모달 내 취소 버튼 클릭
    await act(async () => {
      // 비동기 클릭 이벤트
      await userEvent.click(screen.getByText('취소'));
    });


    // 모달이 정상적으로 닫혔는지 확인
    expect(screen.queryByTestId('unlockModalText')).toBeNull();
  });
});
