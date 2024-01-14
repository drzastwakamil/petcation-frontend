<template>
  <div>
    <div v-if="success">Mail potwierdzony. Przejdź do strony głównej aby się zalogować.</div>
    <div v-else-if="confirmEmailIsLoading">...loading</div>
  </div>
</template>

<script setup lang="ts">
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
