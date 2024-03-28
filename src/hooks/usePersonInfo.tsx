import { useToast } from '@/components/ui/use-toast';
import { personalInfoAPI } from '@/services/personalInfo';
import type { PersonalInfo } from '@/type/personalInfo';
import { useMutation } from '@tanstack/react-query';

export default function usePersonInfo() {
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PersonalInfo) => personalInfoAPI(data),
    onError: (error) => {
      toast({
        duration: 1500,
        variant: 'destructive',
        description: '네트워크 요청에 실패했어요.',
      });
      console.warn(error);
    },
  });

  return { mutate, isPending };
}
