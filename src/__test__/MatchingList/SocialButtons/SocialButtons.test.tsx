// import { render, fireEvent , screen} from '@testing-library/react';
// import SocialButtons from '@/components/matchingList/SocialButtons';

// describe('SocialButtons 컴포넌트', () => {
//   it('메시지 버튼을 클릭했을때 좋아요로 넘어가는지 테스트 합니다.', () => {
//     const { queryByTestId } = render(
//       <SocialButtons />
//     );

//     const messageButton = queryByTestId('message');
//     if (messageButton) {
//       fireEvent.click(messageButton);
//     }

//     expect(screen.getByTestId('heart')).toHaveClass('absolute -top-[40px] bg-[#252525] opacity-70 text-white w-[52px] h-[44px] flex p-4 rounded-t-[28px]');
//   });

//   it('좋아요 버튼을 클릭했을때 메시지로 넘어가는지 테스트 합니다.', () => {
//     const { queryByTestId } = render(
//       <SocialButtons />
//     );

//     const heartButton = queryByTestId('heart');
//     if (heartButton) {
//       fireEvent.click(heartButton);
//     }

//     expect(screen.getByTestId('message')).toHaveClass('absolute -top-[40px] bg-[#252525] opacity-70 text-white w-[52px] h-[44px] flex p-4 rounded-t-[28px]');
//   });
// });