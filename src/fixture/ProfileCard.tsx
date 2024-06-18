import { ProfileCardProps } from "@/type/ProfileCard/ProfileCard";

export const MOCK_PROFILECARD: ProfileCardProps[] = [
  {
    name: '김철수',
    age: '25',
    mbti: 'INTJ',
    tag: ['인디', '발라드', '댄스'],
    time: '5분 전',
    music: [
      {
        song: 'look',
        artist: 'ABCD'
      },
      {
        song: 'ssok',
        artist: 'aaaaABCD'
      }
    ],
    couple: {
      song: 'a',
      artist: 'bbb',
    },
    introduce: '안녕하세요. 저는 김철수입니다.',
    likeMusic: 'music',
    isOpen : false,
  },
  {
    name: '박영희',
    age: '27',
    mbti: 'ENFP',
    tag: ['팝', '재즈', '클래식'],
    time: '10분 전',
    music: [
      {
        song: 'hello',
        artist: 'XYZ'
      },
      {
        song: 'world',
        artist: 'LMNOP'
      }
    ],
    couple: {
      song: 'b',
      artist: 'ccc',
    },
    introduce: '안녕하세요. 저는 박영희입니다.',
    likeMusic: 'music',
    isOpen : false,

  },
  {
    name: '이민호',
    age: '30',
    mbti: 'ISTP',
    tag: ['록', '힙합', '알앤비'],
    time: '1시간 전',
    music: [
      {
        song: 'rockstar',
        artist: 'DEF'
      },
      {
        song: 'rapstar',
        artist: 'GHIJK'
      }
    ],
    couple: {
      song: 'c',
      artist: 'ddd',
    },
    introduce: '안녕하세요. 저는 이민호입니다.',
    likeMusic: 'music',
    isOpen : false,

  }
];
