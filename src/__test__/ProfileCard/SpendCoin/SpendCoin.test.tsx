import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileCard from '@/pages/matching/index';

describe('ProfileCard에서 재화 감소 확인', () => {
  it('확인 버튼을 클릭하면 재화가 12에서 10으로 올바르게 감소한다', async () => {
    render(<ProfileCard />);

    // getByTestId는 요소가 반드시 존재해야 하며, 요소가 없을 경우 에러를 발생시키는 반면, queryByTestId는 요소가 없을 경우 null을 반환합니다.
    // 가정: 재화의 초기 값이 화면에 표시되고 있음
    expect(screen.getByTestId('currency')).toHaveTextContent('12');

    // 연인과 함께듣는곡이 보이지 않아야함
    expect(screen.queryByTestId('couple')).toBeNull();

    // 스스로를 소개해주세요 보이지 않아야함
    expect(screen.queryByTestId('introduction')).toBeNull();

    // 어떤 음악취향을 가진 상대에게 호감을 느끼나요 보이지 않아야함
    expect(screen.queryByTestId('likeMusic')).toBeNull();

    // img 접근 후 alt 'lock' 에 접근 후 버튼 클릭
    await act(async () => {
      const lockImage = await screen.findByRole('img', { name: 'lock' })
      await userEvent.click(lockImage);
    })

    // 잠금해제하고 더 읽기 로 접근
    await act(async () => {
      await userEvent.click(screen.getByText('잠금해제하고 더 읽기'));
    })

    // 확인 버튼 클릭
    await act(async () => {
      await userEvent.click(screen.getByText('확인'));
    });

    // 재화가 올바르게 감소했는지 확인
    expect(screen.getByTestId('currency')).toHaveTextContent('10');

    // 연인과 함꼐 듣고싶은 곡 텍스트가 나왔는지 확인
    expect(screen.getByTestId('couple')).toHaveTextContent('연인과 함께 듣고싶은 곡');

    // 스스로를 소개해주세요 나왔는지 확인
    expect(screen.getByTestId('introduction')).toHaveTextContent('스스로를 소개해주세요');

    // 어떤 음악취향을 가진 상대에게 호감을 느끼나요 나왔는지 확인
    expect(screen.getByTestId('likeMusic')).toHaveTextContent('어떤 음악취향을 가진 상대에게 호감을 느끼나요 ?');

  });
});
