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

const FormSchema = z.object({
  type: z.enum(["kakao", "phone"], {
    required_error: "You need to select a notification type.",
  }),

  message: z.string({
    required_error: "메시지를 입력해야 합니다.",
  }).min(1, "메시지를 입력해야 합니다.")
})


const PostMessage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    
  })

  const onSubmit = () => {
    toast({
      title: "전송이 완료되었습니다. ",
      // data: z.infer<typeof FormSchema>
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),

    })
  }
  const { setOpenMessage } = useProfileCardStore();

  return (
    <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center`} onClick={setOpenMessage}>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] h-[350px] px-6 py-5 space-y-6 bg-[#fff] rounded-2xl"
          onClick={e => e.stopPropagation()}
          data-testid="postMessageModalText">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className={`text-[0.75rem] text-[#2F2F2F] font-semibold`}>전송방식 선택</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 px-3 pb-5"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormLabel className={`text-[0.625rem] text-[#0A0A0A]`}>
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

                <FormField
                  control={form.control}
                  name="message" 
                  render={() => (
                    <FormItem>
                    <FormLabel className={`text-[0.75rem] text-[#2F2F2F] font-semibold`}>메시지 내용</FormLabel>

                    <Textarea
                      {...form.register("message")} // 'register' 함수를 사용하여 'message' 필드를 등록합니다.
                      className="block w-full mt-1 border-0 bg-[#F1F1F1] rounded-md shadow-sm"
                    />
                    </FormItem>
                  )}
                />
                <FormMessage />

              </FormItem>
            )}
          />
          <div className="text-right">
          <button type="submit" >
            <img src={post} alt='post' />
          </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PostMessage;
