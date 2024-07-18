import { render, screen, act, fireEvent } from '@testing-library/react';
import ProfileCard from '@/pages/matching/index';
import PostMessage from '@/components/matching/PostMessageModal';
import userEvent from '@testing-library/user-event';
import { toast } from '@/components/ui/use-toast';
global.ResizeObserver = require('resize-observer-polyfill');


// useProfileCardStore and toast function are mocked.
vi.mock('@/store/profileCardStore', async (importOriginal) => {
  const actual: () => Promise<unknown> = await importOriginal()
  return {
    ...actual,
    useProfileCardStore: () => ({
      setOpenMessage: vi.fn(),
    }),
  }
})

vi.mock('@/components/ui/use-toast', async (importOriginal) => {
  const actual: () => Promise<unknown> = await importOriginal()
  return {
    ...actual,
    toast: vi.fn(),
  }
})

describe('PostMessage 컴포넌트 테스트', () => {
  it('컴포넌트가 정상적으로 렌더링 되는지 확인', async () => {
    render(<ProfileCard />);

    // 클릭하기 전에는 Modal 텍스트가 보이지 않아야 함
    expect(screen.queryByTestId('postMessageModalText')).toBeNull();

    // img 접근 후 alt 'lock' 에 접근 후 버튼 클릭
    await act(async () => {
      const lockImage = await screen.findByRole('img', { name: 'lock' })
      await userEvent.click(lockImage);
    })

    await act(async () => {
      await userEvent.click(screen.getByText('잠금해제하고 더 읽기'));
    })

    // 확인 버튼 클릭
    await act(async () => {
      await userEvent.click(screen.getByText('확인'));
    })

    await act(async () => {
      // alt 텍스트가 'message'인 이미지를 찾습니다.
      const messageImage = await screen.findByRole('img', { name: 'message' });
      // 이미지 클릭
      await userEvent.click(messageImage);
    })

    // img 클릭 후 Modal 텍스트가 보이는지 확인

    expect(screen.getByTestId('postMessageModalText')).toHaveTextContent('전송방식 선택');
    expect(screen.getByTestId('postMessageModalText')).toHaveTextContent(`카톡 ID`);
    expect(screen.getByTestId('postMessageModalText')).toHaveTextContent(`전화번호`);
    expect(screen.getByTestId('postMessageModalText')).toHaveTextContent(`메시지 내용`);
  });

  it('message 필드가 사용자 입력을 올바르게 처리하는지 확인', async () => {
    render(<ProfileCard />);

    fireEvent.change(screen.getByTestId('message') as HTMLInputElement, {
      target: { value: '테스트 메시지' },
    });

    // 값이 제대로 입력되었는지 확인합니다.
    expect((screen.getByTestId('message') as HTMLInputElement).value).toBe('테스트 메시지');

  });

  it('라디오 버튼을 올바르게 클릭하는지 확인', async () => {
    render(<PostMessage />);
    // '카톡 ID'와 '전화번호' 라디오 버튼을 찾습니다.
    const kakaoRadioButton = screen.getByRole('radio', { name: /카톡 ID/i });
    const phoneRadioButton = screen.getByRole('radio', { name: /전화번호/i });

    // '카톡 ID' 라디오 버튼을 선택합니다.
    await act(async () => {
      await userEvent.click(kakaoRadioButton);
    })

    // '카톡 ID'가 선택되었는지 확인합니다.
    expect(kakaoRadioButton).toBeChecked();
    expect(phoneRadioButton).not.toBeChecked();

    // '전화번호' 라디오 버튼을 선택합니다.
    await act(async () => {
      await userEvent.click(phoneRadioButton);
    })

    // '전화번호'가 선택되었는지 확인합니다.
    expect(phoneRadioButton).toBeChecked();
    expect(kakaoRadioButton).not.toBeChecked();
  })

  it('폼 제출 시 toast 호출 및 setOpenMessage 호출 확인', async () => {
    render(<PostMessage />)

    // 라디오 버튼 선택
    await act(async () => {

      const kakaoRadio = screen.getByRole('radio', { name: '카톡 ID' })
      await userEvent.click(kakaoRadio)
    })


    // 메시지 입력
    await act(async () => {

      const messageInput = screen.getByTestId('message')
      await userEvent.type(messageInput, '테스트 메시지')
    })

    await act(async () => {
      // 제출 버튼 클릭
      const submitButton = screen.getByRole('button')
      await userEvent.click(submitButton)
    })

    // toast 함수 호출 확인
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: "전송이 완료되었습니다.",
    }))

  });
});
