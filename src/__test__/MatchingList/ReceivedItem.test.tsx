import { render, screen } from '@testing-library/react';
import ReceivedItem from '@/components/matchingList/ReceivedItem';

describe('ReceivedItem 컴포넌트', () => {
  it('ReceivedItem 컴포넌트가 메시지 모드일때 테스트 합니다.', () => {
    const mockProps = {
      name: 'John Doe',
      age: '25',
      mbti: 'ENFJ',
      tag: 'Tech',
      time: '10:30',
      song: 'Song Title',
      singer: 'Singer Name',
      type: 'message', 
    };

    const { getByPlaceholderText } = render(<ReceivedItem {...mockProps} />);
    const textarea = getByPlaceholderText('메시지 보내기');

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveClass('flex min-h-[80px] w-full rounded-md border border-[#0A0A0A] px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:bg-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 resize-none outline-none text-[#2F2F2F] h-[80px] bg-transparent');

  });

  it('ReceivedItem 컴포넌트가 메시지 모드가 아닐때 테스트 합니다.', () => {
    const mockProps = {
      name: 'John Doe',
      age: '25',
      mbti: 'ENFJ',
      tag: 'Tech',
      time: '10:30',
      song: 'Song Title',
      singer: 'Singer Name',
      isDark : false,
    };

     // MusicCard 컴포넌트 렌더링
     const { getByText } = render(<ReceivedItem {...mockProps} />);

     // song과 singer 텍스트가 잘 렌더링되는지 확인
     const songElement = getByText(mockProps.song);
     const singerElement = getByText(mockProps.singer);
 
     expect(songElement).toBeInTheDocument();
     expect(singerElement).toBeInTheDocument();
 
     // isDark prop과 관련된 스타일 또는 클래스 확인
     expect(screen.getByTestId('musicCard')).toHaveClass('bg-[#fff]');
  });

});
