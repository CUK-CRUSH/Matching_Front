import useMyPageStore from '@/store/myPageStore';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import MatchingListHeader from '../layout/matchingListHeader';
import { MBTIState } from '@/type/store/MyPage/MypageState';

const mbtiOptions = ['E', 'N', 'F', 'J', 'I', 'S', 'T', 'P'];

type MBTIGroup = 'E_I' | 'N_S' | 'F_T' | 'J_P';

const IntroducePage = () => {
  const {
    setCurrentPage,
    selectedMBTI,
    setSelectedMBTI,
    selectedMusicTag,
    setSelectedMusicTag,
    selectedHobbyTag,
    setSelectedHobbyTag,
    textarea1,
    setTextarea1,
    textarea2,
    setTextarea2,
  } = useMyPageStore();

  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      textarea1,
      textarea2,
      living: false,
    },
  });

  const [mbtiString, setMbtiString] = useState<string>('');

  const handleMBTIClick = (group: MBTIGroup, value: string) => {
    const newMBTI = {
      ...selectedMBTI,
      [group]: selectedMBTI[group] === value ? null : value,
    };
    setSelectedMBTI(newMBTI);
    updateMBTIString(newMBTI);
  };

  const updateMBTIString = (mbti: MBTIState) => {
    const mbtiArray = [mbti.E_I, mbti.N_S, mbti.F_T, mbti.J_P].filter((v) => v !== null);
    setMbtiString(mbtiArray.length === 0 ? 'NONE' : mbtiArray.join(''));
  };

  const isMBTIDisabled = watch('living');

  const filledMbtiCount = isMBTIDisabled || mbtiString.length === 4 ? 1 : 0;
  const filledTextAreaCount =
    (textarea1.length >= 50 && textarea1.length <= 500 ? 1 : 0) +
    (textarea2.length >= 50 && textarea2.length <= 500 ? 1 : 0);
  const filledMusicAndHobbyCount = selectedMusicTag && selectedHobbyTag ? 1 : 0;

  const totalField = 4;
  const filledFieldsCount = filledMbtiCount + filledMusicAndHobbyCount + filledTextAreaCount;

  const onSubmit = (data: any) => {
    setTextarea1(data.textarea1);
    setTextarea2(data.textarea2);
    const postData = {
      mbtiString,
      selectedMusicTag,
      selectedHobbyTag,
      textarea1: data.textarea1,
      textarea2: data.textarea2,
    };
    console.log(postData);
  };

  const handleHighlightMusicTag = (tag: string) => {
    setSelectedMusicTag([tag]);
  };

  const handleHighlightHobbyTag = (tag: string) => {
    setSelectedHobbyTag([tag]);
  };

  return (
    <div className="text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <MatchingListHeader
          text="내 소개"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 프로필 수정"
        />

        <div className="flex flex-col p-4 space-y-4">
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
                      if (value) {
                        setSelectedMBTI({
                          E_I: null,
                          N_S: null,
                          F_T: null,
                          J_P: null,
                        });
                        setMbtiString('NONE');
                      } else {
                        setMbtiString('');
                      }
                    }}
                  />
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mx-4">
            {mbtiOptions.map((type, index) => {
              const group = ['E_I', 'N_S', 'F_T', 'J_P'][index % 4] as MBTIGroup;
              return (
                <Button
                  key={type}
                  variant="outline"
                  className={`flex items-center justify-center h-20 w-full 
          ${index < 4 ? 'rounded-t-2xl' : 'rounded-b-2xl'}
          ${selectedMBTI[group] === type ? 'bg-white text-black' : 'bg-2B2B2B text-white'}
          ${isMBTIDisabled ? 'bg-2B2B2B text-gray-600' : ''}`}
                  onClick={() => handleMBTIClick(group, type)}
                  disabled={isMBTIDisabled}
                >
                  {type}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">태그</span>
            <button onClick={() => setCurrentPage('tags')}>태그 수정하기</button>
          </div>

          <div className="mx-4">
            <span className="text-lg font-bold">음악</span>
            <div className="flex space-x-2 mt-2">
              {selectedMusicTag.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className={`${selectedMusicTag[0] === tag ? 'bg-white text-black' : 'bg-[#1c1c1c]'} rounded-3xl`}
                  onClick={() => handleHighlightMusicTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="mx-4">
            <span className="text-lg font-bold">취미</span>
            <div className="flex space-x-2 mt-2">
              {selectedHobbyTag.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className={`${selectedHobbyTag[0] === tag ? 'bg-white text-black' : 'bg-[#1c1c1c]'} rounded-3xl`}
                  onClick={() => handleHighlightHobbyTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
              <span className="text-lg font-bold">Q. 스스로에 대해 이야기해주세요.</span>
              <Controller
                name="textarea1"
                control={control}
                defaultValue={textarea1}
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
              <span className="text-lg font-bold">
                Q. 어떤 음악취향을 가진 상대에게 호감을 느끼나요?
              </span>
              <Controller
                name="textarea2"
                control={control}
                defaultValue={textarea2}
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
                {filledFieldsCount}/{totalField} 완료
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
