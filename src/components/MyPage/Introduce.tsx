import useMyPageStore from '@/store/myPageStore';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Textarea } from '../ui/textarea';
import MatchingListHeader from '../layout/matchingListHeader';
import { MBTIState } from '@/type/store/MyPage/MypageState';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserIntroData, patchUserIntroData } from '@/services/Mypage/MypageAPI';
import { TagsState, UserIntroDTO } from '@/type/services/Mypage/MypageDTO';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UseAccessToken from '@/hooks/useAccessToken';
import { CaretRightOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox } from '../ui/checkbox';

const mbtiOptions = ['E', 'N', 'F', 'J', 'I', 'S', 'T', 'P'];

type MBTIGroup = 'E_I' | 'N_S' | 'F_T' | 'J_P';

const formSchema = z.object({
  textarea1: z.string().optional(),
  textarea2: z.string().optional(),
});

const IntroducePage = () => {
  const {
    setCurrentPage,
    selectedMBTI,
    setSelectedMBTI,
    selectedMusicTag,
    setSelectedMusicTag,
    selectedHobbyTag,
    setSelectedHobbyTag,
    textarea1 = '',
    setTextarea1,
    textarea2 = '',
    setTextarea2,
  } = useMyPageStore();

  // access토큰
  const accessToken = UseAccessToken();

  const queryClient = useQueryClient();

  const { data: IntroData, error } = useQuery<UserIntroDTO>({
    queryKey: ['IntroData'],
    queryFn: () => getUserIntroData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (IntroData: UserIntroDTO) => patchUserIntroData(accessToken, IntroData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['IntroData'] });
      queryClient.invalidateQueries({ queryKey: ['mainData'] });
      setCurrentPage('mypage');
    },
  });

  const { control, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textarea1: textarea1 || '',
      textarea2: textarea2 || '',
      living: false,
    },
  });

  useEffect(() => {
    if (IntroData) {
      setTextarea1(IntroData.selfIntroduction || '');
      setTextarea2(IntroData.likeableMusicTaste || '');
      setValue('textarea1', IntroData.selfIntroduction || '');
      setValue('textarea2', IntroData.likeableMusicTaste || '');

      const mbtiData = IntroData.mbti ? IntroData.mbti.split('') : [];
      setSelectedMBTI({
        E_I: mbtiData.includes('E') ? 'E' : mbtiData.includes('I') ? 'I' : null,
        N_S: mbtiData.includes('N') ? 'N' : mbtiData.includes('S') ? 'S' : null,
        F_T: mbtiData.includes('F') ? 'F' : mbtiData.includes('T') ? 'T' : null,
        J_P: mbtiData.includes('J') ? 'J' : mbtiData.includes('P') ? 'P' : null,
      });

      const featuredMusicTags = IntroData.musicTags
        .filter((tag) => tag.state === 'FEATURED')
        .map((tag) => tag.name);
      const featuredHobbyTags = IntroData.hobbyTags
        .filter((tag) => tag.state === 'FEATURED')
        .map((tag) => tag.name);

      setSelectedMusicTag(featuredMusicTags.length ? featuredMusicTags : []);
      setSelectedHobbyTag(featuredHobbyTags.length ? featuredHobbyTags : []);

      if (IntroData.mbti === 'NONE') {
        setValue('living', true);
      }
    }
  }, [IntroData, setTextarea1, setTextarea2, setValue, setSelectedMBTI]);

  const [mbtiString, setMbtiString] = useState<string>(IntroData?.mbti || '');

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

  const handleTagClick = (
    tag: string,
    selectedTags: string[],
    setSelectedTags: (tags: string[]) => void,
  ) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags([]); // 클릭된 태그가 이미 FEATURED 상태라면 상태를 해제
    } else {
      setSelectedTags([tag]); // 클릭된 태그가 FEATURED 상태가 아니라면 FEATURED로 설정
    }
  };

  const handleMusicTagClick = (tag: string) => {
    handleTagClick(tag, selectedMusicTag, setSelectedMusicTag);
  };

  const handleHobbyTagClick = (tag: string) => {
    handleTagClick(tag, selectedHobbyTag, setSelectedHobbyTag);
  };

  const onSubmit = (data: any) => {
    const updatedMusicTags = IntroData?.musicTags.map((tag) => ({
      ...tag,
      state: selectedMusicTag.includes(tag.name)
        ? ('FEATURED' as TagsState)
        : ('STANDARD' as TagsState),
    }));

    const updatedHobbyTags = IntroData?.hobbyTags.map((tag) => ({
      ...tag,
      state: selectedHobbyTag.includes(tag.name)
        ? ('FEATURED' as TagsState)
        : ('STANDARD' as TagsState),
    }));

    const postData: UserIntroDTO = {
      mbti: mbtiString || IntroData?.mbti || null,
      musicTags: updatedMusicTags ?? [],
      hobbyTags: updatedHobbyTags ?? [],
      selfIntroduction: data.textarea1,
      likeableMusicTaste: data.textarea2,
    };

    mutation.mutate(postData);
  };

  const mbtiComplete =
    selectedMBTI.E_I !== null &&
    selectedMBTI.N_S !== null &&
    selectedMBTI.F_T !== null &&
    selectedMBTI.J_P !== null;

  const musicTagComplete = selectedMusicTag.length > 0;
  const hobbyTagComplete = selectedHobbyTag.length > 0;

  const textarea1Complete = watch('textarea1').length >= 50 && watch('textarea1').length <= 500;
  const textarea2Complete = watch('textarea2').length >= 50 && watch('textarea2').length <= 500;

  const filledFieldsCount =
    (mbtiComplete || isMBTIDisabled ? 1 : 0) +
    (musicTagComplete && hobbyTagComplete ? 1 : 0) +
    (textarea1Complete ? 1 : 0) +
    (textarea2Complete ? 1 : 0);

  if (error) return <div>Error loading intro data</div>;
  if (!IntroData) return <div>Loading...</div>;

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
            <span className="text-l text-local_gray_2 font-bold">MBTI</span>
            <Controller
              name="living"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center space-x-1">
                  <span className="text-sm">생략하기</span>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={(value: boolean) => {
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
                        setSelectedMBTI({
                          E_I: null,
                          N_S: null,
                          F_T: null,
                          J_P: null,
                        });
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
                  className={`flex items-center justify-center h-32 w-full 
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

          <div className="flex items-center justify-between text-local_gray_2">
            <span className="text-l font-bold">태그</span>
            <button onClick={() => setCurrentPage('tags')}>
              태그 수정하기
              <CaretRightOutlined />
            </button>
          </div>

          <div className="mx-4">
            <span className="text-l font-bold">음악</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {IntroData.musicTags.map((tag) => (
                <Button
                  key={tag.name}
                  variant="outline"
                  className={`${
                    selectedMusicTag.includes(tag.name) ? 'bg-white text-black' : 'bg-[#1c1c1c]'
                  } rounded-3xl`}
                  onClick={() => handleMusicTagClick(tag.name)}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="mx-4">
            <span className="text-lg font-bold">취미</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {IntroData.hobbyTags.map((tag) => (
                <Button
                  key={tag.name}
                  variant="outline"
                  className={`${
                    selectedHobbyTag.includes(tag.name) ? 'bg-white text-black' : 'bg-[#1c1c1c]'
                  } rounded-3xl`}
                  onClick={() => handleHobbyTagClick(tag.name)}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex items-center mb-10">
              <ExclamationCircleOutlined className="mb-1 mr-2" />
              <div className="flex flex-col items-start text-sm font-bold text-[#858585]">
                <p>강조하고싶은 대표 태그를,</p>
                <p>카테고리(음악/취미)당 1개씩 눌러 선택해주세요.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <span className="text-[#858585]">1문 N답: 길게 적는 내 소개글</span>
            <div className="mx-4">
              <Controller
                name="textarea1"
                control={control}
                defaultValue={textarea1}
                render={({ field }) => (
                  <>
                    <div className="flex flex-row justify-between mb-1">
                      <p className="text-l font-bold">Q. 스스로에 대해 이야기해주세요.</p>
                      <p className="text-right text-[#858585]">{field.value.length} / 500</p>
                    </div>
                    <Textarea
                      placeholder="내용을 입력해주세요"
                      {...field}
                      className="bg-[#1c1c1c] border border-gray-600 text-white w-full h-32 resize-none"
                    />

                    {field.value.length < 50 && (
                      <span className="text-red-500">50자 이상을 채워주세요</span>
                    )}
                    {field.value.length > 500 && (
                      <span className="text-red-500">500자 미만으로 채워주세요</span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mx-4">
              <Controller
                name="textarea2"
                control={control}
                defaultValue={textarea2}
                render={({ field }) => (
                  <>
                    <div className="flex flex-row justify-between mb-1">
                      <p className="text-l font-bold flex-grow">
                        Q. 어떤 음악취향을 가진 상대에게 호감을 느끼나요?
                      </p>
                      <p className="text-right text-[#858585] whitespace-nowrap ml-2">
                        {field.value.length} / 500
                      </p>
                    </div>

                    <Textarea
                      placeholder="내용을 입력해주세요"
                      {...field}
                      className="bg-[#1c1c1c] border border-gray-600 text-white w-full h-32 resize-none"
                    />

                    {field.value.length < 50 && (
                      <span className="text-red-500">50자 이상을 채워주세요</span>
                    )}
                    {field.value.length > 500 && (
                      <span className="text-red-500">500자 미만으로 채워주세요</span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex justify-center w-full mt-4">
              <div className="w-auto text-l text-local_gray_2 py-2 px-4 rounded-full">
                {filledFieldsCount}/4 완료
              </div>
            </div>
            <Button
              variant={'noHover'}
              type="submit"
              className="w-full bg-white text-black mt-4 rounded-3xl"
            >
              저장하기
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IntroducePage;
