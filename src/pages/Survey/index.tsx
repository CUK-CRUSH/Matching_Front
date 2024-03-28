import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import type { Disease, PersonalInfo } from '@/type/personalInfo';
import usePersonInfo from '@/hooks/usePersonInfo';
import Card from '../common/components/Card';
import Layout from '@/components/layout/layout';
import { useToast } from '@/components/ui/use-toast';
import manIcon from '@/assets/Man.svg';
import womanIcon from '@/assets/Woman.svg';
import brainIcon from '@/assets/Brain.svg';
import heartIcon from '@/assets/Heart.svg';
import cancerIcon from '@/assets/Cancer.svg';
import bornIcon from '@/assets/BornFire.svg';
import teethIcon from '@/assets/Teeth.svg';
import dementiaIcon from '@/assets/Dementia.svg';
import checkedIcon from '@/assets/Checked.svg';
import unCheckedIcon from '@/assets/UnChecked_check.svg';
import ErrorText from '../common/components/ErrorText';
import { useSetRecoilState } from 'recoil';
import { insuranceProductState } from '@/atom/response';
import { useNavigate } from 'react-router-dom';
import Badge from '@/components/ui/badge';
import HelperText from '../common/HelperText';

const options: Array<{ label: string; value: Disease; icon?: string }> = [
  { label: '뇌혈관질환', value: 'BRAIN', icon: brainIcon },
  { label: '심장질환', value: 'HEART', icon: heartIcon },
  { label: '암', value: 'CANCER', icon: cancerIcon },
  { label: '골절', value: 'BORNFIRE', icon: bornIcon },
  { label: '치아', value: 'TEETH', icon: teethIcon },
  { label: '치매', value: 'DEMENTIA', icon: dementiaIcon },
  { label: '없음', value: 'NONE' },
];

const Example = () => {
  const { mutate, isPending } = usePersonInfo();
  const { toast } = useToast();
  const setInsuranceProduct = useSetRecoilState(insuranceProductState);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: {
      gender: 'MALE',
      birth: '',
      disease: [],
      analyze: '',
      productType: 'LIFE',
    },
    mode: 'onChange',
  });

  const birth = watch('birth');
  const handleBirthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value
      .replace(/\D/g, '')
      .replace(/^(\d{4})(\d)/g, '$1-$2')
      .replace(/-(\d{2})(\d)/g, '-$1-$2')
      .slice(0, 10);
    setValue('birth', value);
  };

  const selectedOptions = watch('disease');

  const handleMultiSelectChange = (value: Disease) => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      if (newSelectedOptions.length < 3) {
        newSelectedOptions.push(value);
      } else {
        toast({
          duration: 1500,
          variant: 'destructive',
          description: '질병/질환은 세개만 입력할 수 있어요.',
        });

        console.log('toast!');
      }
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    setValue('disease', newSelectedOptions, { shouldValidate: true }); // Update form value
  };

  const onSubmit: SubmitHandler<PersonalInfo> = (data: PersonalInfo) => {
    if (data.disease.length === 0) {
      setError('disease', { message: '질병/질환은 필수로 입력해주세요.' });
      return;
    }

    if (data.analyze.length === 0) {
      setError('analyze', { type: 'minlength', message: '상세정보를 입력해주세요.' });
      return;
    }

    if (data.analyze.length > 500) {
      setError('analyze', { message: '상세정보는 500자 이내로 입력해주세요.' });
      return;
    }

    console.log(data);
    mutate(data, {
      onSuccess: (apiResponseData) => {
        // API 응답 데이터를 콘솔에 출력
        console.log(apiResponseData);
        // API 응답 데이터를 Recoil 상태에 저장
        setInsuranceProduct(apiResponseData);
        navigate('/result');
      },
      onError: (error) => {
        // 에러 처리 로직, 필요한 경우 toast를 사용하여 에러 메시지 표시
        console.error('Error updating the insurance product info: ', error);
        toast({
          duration: 1500,
          variant: 'destructive',
          description: '정보 업데이트 중 에러가 발생했습니다.',
        });
      },
    });
  };

  const gender = watch('gender');
  const productType = watch('productType');

  return (
    <Layout footerHidden>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
        <div>
          <h2 className="font-black text-2xl my-4">개인정보 입력</h2>
          <p className="mb-10">
            보험을 추천하기 위해서는 개인정보 입력이 필요합니다. 맞춤형 보험 상품 추천으로 합리적인
            보험상품을 추천받아보세요.
          </p>

          <div className="flex items-center gap-2">
            <h2 className="font-black text-2xl my-4">원하는 보험 선택</h2>
            <Badge backgroundColor="bg-blue-200" dataName="필수" textColor="text-blue-600" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                {...register('productType')}
                type="radio"
                value="LIFE"
                id="LIFE"
                disabled={isPending}
                hidden
              />
              <label htmlFor="LIFE">
                <Card
                  content="종신보험"
                  checked={productType === 'LIFE'}
                  icon={productType === 'LIFE' ? checkedIcon : unCheckedIcon}
                />
              </label>
            </div>
            <div>
              <input
                {...register('productType')}
                type="radio"
                value="DISEASE"
                id="DISEASE"
                disabled={isPending}
                hidden
              />
              <label htmlFor="DISEASE">
                <Card
                  content="질병보험"
                  checked={productType === 'DISEASE'}
                  icon={productType === 'DISEASE' ? checkedIcon : unCheckedIcon}
                />
              </label>
            </div>
          </div>
          {errors?.productType?.message && <ErrorText>{errors.productType.message}</ErrorText>}

          <div className="flex items-center gap-2">
            <h2 className="font-black text-2xl my-4">성별</h2>
            <Badge backgroundColor="bg-blue-200" dataName="필수" textColor="text-blue-600" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                {...register('gender')}
                type="radio"
                value="MALE"
                id="MALE"
                disabled={isPending}
                hidden
              />
              <label htmlFor="MALE">
                <Card content="남" checked={gender === 'MALE'} icon={manIcon} />
              </label>
            </div>
            <div>
              <input
                {...register('gender')}
                type="radio"
                value="FEMALE"
                id="FEMALE"
                disabled={isPending}
                hidden
              />
              <label htmlFor="FEMALE">
                <Card content="여" checked={gender === 'FEMALE'} icon={womanIcon} />
              </label>
            </div>
          </div>
          {errors?.gender?.message && <ErrorText>{errors?.gender?.message}</ErrorText>}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-black text-2xl my-4">생년월일</h2>
            <Badge backgroundColor="bg-blue-200" dataName="필수" textColor="text-blue-600" />
          </div>
          <input
            {...register('birth', {
              required: '생년월일은 필수에요.',
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: 'YYYY-MM-DD 형식으로 입력해주세요.',
              },
            })}
            value={birth}
            onChange={handleBirthChange}
            placeholder="생년월일을 입력해주세요."
            disabled={isPending}
            className="w-full rounded-lg px-4 py-2 border-gray-200 border-2 focus:border-gray-400 outline-none"
          />
          {errors?.birth?.message && <ErrorText>{errors?.birth?.message}</ErrorText>}
        </div>

        <div>
          <h2 className="font-black text-2xl my-4">질병/질환</h2>
          <div className="mb-4">
            <HelperText>질병/질환을 3개 이하로 선택해주세요.</HelperText>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option, index) => (
              <Controller
                key={index}
                name="disease"
                control={control}
                render={() => (
                  <div>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleMultiSelectChange(option.value)}
                      id={`multi-select-${index}`}
                      disabled={isPending}
                      hidden
                    />
                    <label htmlFor={`multi-select-${index}`}>
                      <Card
                        content={option.label}
                        checked={selectedOptions.includes(option.value)}
                        icon={option.icon}
                      />
                    </label>
                  </div>
                )}
              />
            ))}
          </div>
        </div>
        {errors?.disease?.message && <ErrorText>{errors?.disease?.message}</ErrorText>}

        {/* 
            1. 보장기간  
2. 월납입액
3. 납입기간
4. 보험갱신여부
5. 보험금지급형태 
6. 보장 질병 (ex. 암, 뇌혈관질환 등)
          */}

        <div>
          <h2 className="font-black text-2xl my-4">자유양식</h2>
          <div className="mx-2 mb-4">
            <HelperText>* 보험 기준 예시</HelperText>
            <HelperText>1. 보장기간 </HelperText>
            <HelperText>2. 월납입액</HelperText>
            <HelperText>3. 납입기간</HelperText>
            <HelperText>4. 보험갱신여부</HelperText>
            <HelperText>5. 보험금지급형태 </HelperText>
            <HelperText>6. 보장 질병 (ex. 암, 뇌혈관질환 등)</HelperText>
          </div>
          <textarea
            {...register('analyze', {
              minLength: 1,
              maxLength: 500,
            })}
            maxLength={500}
            placeholder="본인의 직업과 원하는 보험의 기준을 입력해주세요."
            disabled={isPending}
            className="w-full rounded-lg px-4 py-2 h-[200px] border-gray-200 border-2 focus:border-gray-400 outline-none"
          />
          {errors?.analyze?.message && <ErrorText>{errors?.analyze?.message}</ErrorText>}
        </div>
        <div className="flex justify-center items-center p-4">
          <Button
            type="submit"
            disabled={isPending}
            className="hover:bg-green-400 hover:text-white p-4 px-20 text-xl font-bold text-green-400 bg-white border-green-400 border-[1px]"
          >
            제출하기
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Example;
