<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-black">
    <div v-if="success">
      <Card class="w-full max-w-md">
        <CardContent class="flex flex-col items-center p-8 text-center">
          <Check class="mb-4 h-16 w-16 text-green-500" />
          <h2 class="mb-2 text-xl font-semibold">Sukces!</h2>
          <p class="text-gray-600 dark:text-gray-300">Potwierdzono email. Wróć do strony głównej aby się zalogować.</p>
        </CardContent>
        <CardFooter>
          <Button
            class="w-full justify-center rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            @click="useRouter().push('/')"
          >
            Strona główna
          </Button>
        </CardFooter>
      </Card>
    </div>
    <Loader2 v-else-if="confirmEmailIsLoading" class="h-[50px] w-[50px] animate-spin text-[#C28686]" />
  </div>
</template>

<script setup lang="ts">
import { Check, Loader2 } from 'lucide-vue-next';
import { useRouteQuery } from '@vueuse/router';
import { useMutation } from '@tanstack/vue-query';
import { toast } from '@/components/ui/commonToast';

definePageMeta({
  layout: false,
});
const token = useRouteQuery('t');
const success = ref(false);
const { mutate: executeConfirmEmail, isPending: confirmEmailIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return usePostOnBackend(`confirmEmail`, {
      params: {
        confirmationToken: token.value,
      },
      method: 'POST',
    });
  },
  onSuccess: (response) => {
    const { error, data } = response;
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało potwierdzić maila.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Udało się potwierdzić email.',
      description: 'Możesz się zalogować!',
    });
    success.value = true;
  },
  onError: (error) => {
    toast({
      title: 'Nie udało potwierdzić maila.',
      description: error.message,
      variant: 'destructive',
    });
  },
});
executeConfirmEmail();
</script>
