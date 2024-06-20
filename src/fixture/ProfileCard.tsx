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

  },
  {
    "name": "박민수",
    "age": "27",
    "mbti": "ISTP",
    "tag": ["힙합", "알앤비", "클래식"],
    "time": "15분 전",
    "music": [
      {
        "song": "Sicko Mode",
        "artist": "Travis Scott"
      },
      {
        "song": "Blinding Lights",
        "artist": "The Weeknd"
      }
    ],
    "couple": {
      "song": "Stay",
      "artist": "The Kid LAROI, Justin Bieber"
    },
    "introduce": "안녕하세요. 저는 박민수입니다.",
    "likeMusic": "music",
    "isOpen": false
  },
  {
    "name": "최수지",
    "age": "24",
    "mbti": "INFJ",
    "tag": ["발라드", "팝", "일렉트로닉"],
    "time": "20분 전",
    "music": [
      {
        "song": "Someone Like You",
        "artist": "Adele"
      },
      {
        "song": "Levitating",
        "artist": "Dua Lipa"
      }
    ],
    "couple": {
      "song": "drivers license",
      "artist": "Olivia Rodrigo"
    },
    "introduce": "안녕하세요. 저는 최수지입니다.",
    "likeMusic": "music",
    "isOpen": false
  },
  {
    "name": "정호진",
    "age": "29",
    "mbti": "ENTJ",
    "tag": ["록", "메탈", "발라드"],
    "time": "30분 전",
    "music": [
      {
        "song": "Enter Sandman",
        "artist": "Metallica"
      },
      {
        "song": "Bohemian Rhapsody",
        "artist": "Queen"
      }
    ],
    "couple": {
      "song": "Hotel California",
      "artist": "Eagles"
    },
    "introduce": "안녕하세요. 저는 정호진입니다.",
    "likeMusic": "music",
    "isOpen": false
  }
];
