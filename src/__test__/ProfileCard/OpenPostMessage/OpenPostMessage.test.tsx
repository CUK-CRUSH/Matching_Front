import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileCard from '@/pages/matching/index';
global.ResizeObserver = require('resize-observer-polyfill');

describe('open 상태가 true 일때 메시지 팝업이 잘 나오는지 테스트합니다.', () => {

  test('메시지 팝업이 잘 나오는지 테스트합니다', async () => {
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

});
