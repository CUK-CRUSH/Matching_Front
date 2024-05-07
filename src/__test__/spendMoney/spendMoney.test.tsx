import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileCard from '@/pages/matching/index';

describe('ProfileCard에서 재화 감소 확인', () => {
  it('확인 버튼을 클릭하면 재화가 12에서 10으로 올바르게 감소한다', async () => {
    render(<ProfileCard />);

    // 가정: 재화의 초기 값이 화면에 표시되고 있음
    expect(screen.getByTestId('currency')).toHaveTextContent('12');

    // 잠금 해제를 위한 버튼 클릭
    await userEvent.click(screen.getByAltText('lock'));

    // 잠금해제하고 더 읽기로 접근
    await userEvent.click(screen.getByText('잠금해제하고 더 읽기'));

    // 확인 버튼 클릭
    await userEvent.click(screen.getByText('확인'));

    // 재화가 올바르게 감소했는지 확인
    expect(screen.getByTestId('currency')).toHaveTextContent('10');
  });
});
