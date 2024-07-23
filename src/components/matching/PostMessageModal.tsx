import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import useProfileCardStore from "@/store/profileCardStore"
import post from "@/assets/ProfileCard/post.svg"
import closeButton from "@/assets/ProfileCard/closeButton.svg"
import { postMessage } from "@/services/ProfileCard/MessageProfileCard"; // import postMessage 함수 추가
import { useCookies } from "react-cookie"
import { useState } from "react"

const FormSchema = z.object({
  type: z.enum(["kakao", "phone"], {
    required_error: "한 가지 이상은 선택하셔야 합니다.",
  }),

  message: z.string({
    required_error: "메시지를 입력해야 합니다.",
  }).min(1, "메시지를 입력해야 합니다.")
    .max(200,"최대 200자까지 입력가능합니다.")
})

const PostMessageModal = ({profileId} : PostMessageModalProps) => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  const [textLength, setTextLength] = useState<number>(0);

  const checkTextLength = (data: any) => {
    setTextLength(data.length)
  };

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    try {
      // postMessage 함수 호출하여 API에 데이터 전송
      await postMessage(
        accessToken,
        formData.type === "kakao" ? 1 : 0, // sendType
        profileId, // receiverId 값은 어디서 받아오는지 확인 필요
        formData.message // content
      );

      // 성공 메시지 토스트 출력
      toast({
        title: "전송이 완료되었습니다.",
        className:
          'h-[40px] w-[90%] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center rounded-[8px] exceed:w-[358px]',
      });

      setOpenMessage(); // 모달 닫기
    } catch (error) {
      console.error('전송을 실패했습니다:', error);
      // 실패 처리
    }
  };
  const onError = () => {
    toast({
      title: "오류 : 모든 필드를 올바르게 채워주세요",
      className:
        'h-[40px] w-[90%] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center rounded-[8px] exceed:w-[358px]',
    })
  }
  const { setOpenMessage } = useProfileCardStore();

  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center `} onClick={setOpenMessage} data-testid="postMessageModalText">

      <Form {...form}>
        <form data-testid='submit' onSubmit={form.handleSubmit(onSubmit, onError)} className="w-[300px] h-[350px] px-6 py-5 space-y-6 bg-[#fff] rounded-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* 라디오 버튼 */}
          <FormField

            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <div className={`flex flex-row justify-between`}> 
                  <FormLabel className={`text-[0.75rem] text-[#2F2F2F] font-semibold`}>전송방식 선택</FormLabel>
                  <img src={closeButton} className={`cursor-pointer`} onClick={setOpenMessage}/>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 px-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormLabel className={`text-[0.625rem] text-[#0A0A0A] mr-[6px]`}>
                        카톡 ID
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem className={`w-[21px] h-[21px] bg-[#F1F1F1] border-0 rounded-[4px]`} value="kakao" checked={true} />
                      </FormControl>

                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormLabel className={`text-[0.625rem] text-[#0A0A0A]`}>
                        전화번호
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem className={`w-[21px] h-[21px] bg-[#F1F1F1] border-0 rounded-[4px]`} value="phone" checked={true} />
                      </FormControl>

                    </FormItem>

                  </RadioGroup>
                </FormControl>
                <FormMessage className="fixed top-0 left-0 right-0 mx-auto" />
              </FormItem>
            )}
          />
          {/* 텍스트 에어리어 */}
          <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`text-[0.75rem] text-[#2F2F2F] font-semibold`}>메시지 내용</FormLabel>

                      <Textarea
                        {...form.register("message")} // 'register' 함수를 사용하여 'message' 필드를 등록합니다.
                        onKeyUp={() => checkTextLength(field.value)}
                        data-testid="message"
                        className="block w-full border-0 bg-[#F1F1F1] rounded-md shadow-sm h-[130px]"
                      />
                    </FormItem>
                  )}
                />
          <div className="text-right">
            {textLength} / 200
            <button type="submit">
              <img src={post} alt='post' />
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PostMessageModal;
