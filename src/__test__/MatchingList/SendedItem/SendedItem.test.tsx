// import { render, screen } from '@testing-library/react';
// import SendedItem from '@/components/matchingList/SendedItem';

// describe('SendedItem 컴포넌트', () => {

//   it('SendedItem 컴포넌트에서 MusicCard isDark 가 적용 되는지 테스트합니다.', () => {
//     const mockProps = {
//       name: 'John Doe',
//       age: '25',
//       mbti: 'ENFJ',
//       tag: 'Tech',
//       time: '10:30',
//       song: 'Song Title',
//       singer: 'Singer Name',
//     };

//      // MusicCard 컴포넌트 렌더링
//      const { getByText } = render(<SendedItem {...mockProps} />);

//      // song과 singer 텍스트가 잘 렌더링되는지 확인
//      const songElement = getByText(mockProps.song);
//      const singerElement = getByText(mockProps.singer);
 
//      expect(songElement).toBeInTheDocument();
//      expect(singerElement).toBeInTheDocument();
 
//      // isDark prop과 관련된 스타일 또는 클래스 확인
//      expect(screen.getByTestId('musicCard')).toHaveClass('bg-[#000]');
//   });

// });
