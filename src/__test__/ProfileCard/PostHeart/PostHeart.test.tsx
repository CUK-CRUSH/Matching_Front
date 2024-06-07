import { render, screen, act } from '@testing-library/react';
import Post from '@/components/matching/SocialButtons'; // 이미지를 포함하고 있는 컴포넌트
import userEvent from '@testing-library/user-event';
import { toast } from '@/components/ui/use-toast';

vi.mock('@/components/ui/use-toast', async (importOriginal) => {
  const actual: () => Promise<unknown> = await importOriginal()
  return {
    ...actual,
    toast: vi.fn(),
  }
})

test('좋아요 이미지가 올바르게 바뀌었는지 테스트 합니닷', async () => {
  render(<Post />); // YourComponent가 이미지 변경 로직을 포함

  // 초기 상태에서의 이미지 검증 (예: offHeart 상태)
  expect(screen.getByAltText('heart')).toHaveAttribute('src', '/src/assets/ProfileCard/offHeart.svg');

  // 이미지 상태 변경을 위한 버튼 클릭 이벤트 시뮬레이션
  await act(async () => {
    // alt 텍스트가 'heart'인 이미지를 찾습니다.
    const heartImage = await screen.findByRole('img', { name: 'heart' });
    // 이미지 클릭
    await userEvent.click(heartImage);
  })

  // 상태 변경 후의 이미지 검증 (예: onHeart 상태)
  expect(screen.getByAltText('heart')).toHaveAttribute('src', '/src/assets/ProfileCard/onHeart.svg');
  // toast 함수 호출 확인
  expect(toast).toHaveBeenCalledWith(expect.objectContaining({
    title: "좋아요가 전송되었습니다.",
  }))
});
