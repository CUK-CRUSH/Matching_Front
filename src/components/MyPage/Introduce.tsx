import useMyPageStore from '@/store/myPageStore';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

const mbtiOptions = ['E', 'I', 'N', 'S', 'F', 'T', 'J', 'P'];

type MBTIGroup = 'E_I' | 'N_S' | 'F_T' | 'J_P';

const IntroducePage = () => {
  const { setCurrentPage } = useMyPageStore();
  const { control, watch, setValue, handleSubmit } = useForm();
  const [selectedMBTI, setSelectedMBTI] = useState<{
    E_I: string | null;
    N_S: string | null;
    F_T: string | null;
    J_P: string | null;
  }>({
    E_I: null,
    N_S: null,
    F_T: null,
    J_P: null,
  });
  const [selectedMusicTag, setSelectedMusicTag] = useState<string | null>(null);
  const [selectedHobbyTag, setSelectedHobbyTag] = useState<string | null>(null);
  const [mbtiString, setMbtiString] = useState<string>('');

  const handleMBTIClick = (group: MBTIGroup, value: string) => {
    setSelectedMBTI((prev) => {
      const newState = {
        ...prev,
        [group]: prev[group] === value ? null : value,
      };
      updateMBTIString(newState);
      return newState;
    });
  };

  const updateMBTIString = (mbti: {
    E_I: string | null;
    N_S: string | null;
    F_T: string | null;
    J_P: string | null;
  }) => {
    const mbtiArray = [mbti.E_I, mbti.N_S, mbti.F_T, mbti.J_P].filter((v) => v !== null);
    setMbtiString(mbtiArray.join(''));
  };

  const handleMusicTagClick = (tag: string) => {
    setSelectedMusicTag(tag);
  };

  const handleHobbyTagClick = (tag: string) => {
    setSelectedHobbyTag(tag);
  };

  const isMBTIDisabled = watch('living');
  const textarea1 = watch('textarea1') || '';
  const textarea2 = watch('textarea2') || '';

  const filledTextAreaCount =
    (textarea1.length >= 50 && textarea1.length <= 500 ? 1 : 0) +
    (textarea2.length >= 50 && textarea2.length <= 500 ? 1 : 0);
  const filledFieldsCount =
    (mbtiString ? 1 : 0) +
    (selectedMusicTag ? 1 : 0) +
    (selectedHobbyTag ? 1 : 0) +
    filledTextAreaCount;

  const onSubmit = (data: any) => {
    const postData = {
      mbtiString,
      selectedMusicTag,
      selectedHobbyTag,
      textarea1: data.textarea1,
      textarea2: data.textarea2,
    };
    console.log(postData);
  };

  console.log(mbtiString, selectedMusicTag, selectedHobbyTag);

  return (
    <div className="bg-[#1c1c1c] text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <div className="flex flex-row items-center w-full p-4 space-x-1">
          <button onClick={() => setCurrentPage('mypage')}>
            <LeftOutlined />
          </button>
          <h1 className="text-2xl font-bold">내 소개</h1>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          {/* mbti 타이틀 */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">MBTI</span>
            <Controller
              name="living"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">생략하기</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      setValue('living', value);
                    }}
                  />
                </div>
              )}
            />
          </div>
          {/* mbti */}
          <div className="grid grid-cols-4 gap-2 mx-4">
            {mbtiOptions.map((type, index) => {
              const group = ['E_I', 'N_S', 'F_T', 'J_P'][Math.floor(index / 2)] as MBTIGroup;
              return (
                <Button
                  key={type}
                  variant="outline"
                  className={`${
                    selectedMBTI[group] === type ? 'bg-white text-black' : 'bg-2B2B2B text-white'
                  } ${isMBTIDisabled ? 'bg-2B2B2B text-gray-600' : ''}`}
                  onClick={() => handleMBTIClick(group, type)}
                  disabled={isMBTIDisabled}
                >
                  {type}
                </Button>
              );
            })}
          </div>
          {/* 태그 타이틀 */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">태그</span>
            <button>태그 수정하기</button>
          </div>
          {/* 음악 */}
          <div className="mx-4">
            <span className="text-lg font-bold">음악</span>
            <div className="flex space-x-2 mt-2">
              {['인디', '국내힙합', 'POP'].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className={`${selectedMusicTag === tag ? 'bg-white text-black' : 'bg-[#1c1c1c]'} rounded-3xl`}
                  onClick={() => handleMusicTagClick(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {/* 취미 */}
          <div className="mx-4">
            <span className="text-lg font-bold">취미</span>
            <div className="flex space-x-2 mt-2">
              {['뮤직페스티벌', 'LP모으기', '콘서트'].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className={`${selectedHobbyTag === tag ? 'bg-white text-black' : 'bg-[#1c1c1c]'} rounded-3xl`}
                  onClick={() => handleHobbyTagClick(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {/* 인포 타이틀 */}
          <div className="flex items-center mt-4 space-x-2 text-sm mx-4">
            <span className="text-xl">ⓘ</span>
            <div>
              <p>강조하고싶은 대표 태그를,</p>
              <p> 카테고리(음악/취미)당 1개씩 눌러 선택해주세요</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-4">
            {/* 길게 적는 소개글 */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">1문 N답 : 길게 적는 내 소개글</span>
              <span>{filledTextAreaCount}/2</span>
            </div>
            <div>
              <span className="text-m font-bold">Q. 스스로에 대해 이야기해주세요.</span>
              <Controller
                name="textarea1"
                control={control}
                defaultValue=""
                rules={{ minLength: 50, maxLength: 500 }}
                render={({ field, fieldState }) => (
                  <>
                    <Textarea
                      placeholder="내용을 입력해주세요"
                      {...field}
                      className="bg-[#1c1c1c] border border-gray-600 text-white w-full h-32 resize-none"
                    />
                    {fieldState.error && (
                      <span className="text-red-500">
                        {fieldState.error.type === 'minLength'
                          ? '최소 50자 이상 입력해주세요'
                          : '최대 500자 까지 입력할 수 있어요'}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <span className="text-m font-bold">
                Q. 어떤 음악취향을 가진 상대에게 호감을 느끼나요?
              </span>
              <Controller
                name="textarea2"
                control={control}
                defaultValue=""
                rules={{ minLength: 50, maxLength: 500 }}
                render={({ field, fieldState }) => (
                  <>
                    <Textarea
                      placeholder="내용을 입력해주세요"
                      {...field}
                      className="bg-[#1c1c1c] border border-gray-600 text-white w-full h-32 resize-none"
                    />
                    {fieldState.error && (
                      <span className="text-red-500">
                        {fieldState.error.type === 'minLength'
                          ? '최소 50자 이상 입력해주세요'
                          : '최대 500자 까지 입력할 수 있어요'}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex justify-center w-full mt-4">
              <div className="bg-gray-700 w-auto text-white py-2 px-4 rounded-full">
                {filledFieldsCount}/5 완료
              </div>
            </div>
            <Button type="submit" className="w-full bg-white text-black mt-4">
              저장하기
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IntroducePage;
