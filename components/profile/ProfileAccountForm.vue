<template>
  <div class="space-y-6">
    {{ data }}
    <ClientOnly>
      <Teleport to="#title"> Konto </Teleport>
      <Teleport to="#description"> Zarządzaj swoim kontem </Teleport>
    </ClientOnly>

    <div>
      <h3 class="pb-5 text-lg font-medium">Email</h3>
      <Input :disabled="true" :model-value="email ?? 'email'" type="email" />
    </div>

    <Separator />
    <form @submit="onChangePasswordFormSubmit">
      <h3 class="text-lg font-medium">Zmiana hasła</h3>
      <div class="space-y-3 pt-5">
        <FormField v-slot="{ componentField }" name="currentPassword">
          <FormItem>
            <FormLabel> Obecne hasło</FormLabel>
            <FormControl>
              <Input placeholder="Podaj hasło" type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Nowe hasło</FormLabel>
            <FormControl>
              <Input placeholder="Podaj nowe hasło" type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="repeatPassword">
          <FormItem>
            <FormControl>
              <Input placeholder="Powtórz nowe hasło" type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-4 gap-4 pt-12">
        <div />
        <Button class="col-span-3" :disabled="changingPasswordIsLoading" type="submit">
          Zmień hasło
          <Loader2 v-if="changingPasswordIsLoading" class="ml-2 h-4 w-4 animate-spin" />
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const { toast } = useToast();

const changePasswordFormSchema = toTypedSchema(
  z
    .object({
      currentPassword: z.string({
        required_error: 'Hasło jest wymagane',
        invalid_type_error: 'Hasło musi być tekstem',
      }),
      password: z
        .string({
          required_error: 'Hasło jest wymagane',
          invalid_type_error: 'Hasło musi być tekstem',
        })
        .min(5, 'Hasło musi posiadać minimum 5 znaków '),
      repeatPassword: z.string({
        required_error: 'Hasło jest wymagane',
        invalid_type_error: 'Hasło musi być tekstem',
      }),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Hasła nie są identyczne!',
      path: ['repeatPassword'],
    }),
);
const form = useForm({
  validationSchema: changePasswordFormSchema,
});

const onChangePasswordFormSubmit = form.handleSubmit(() => {
  executeChangePasswordMutate();
});
const { mutate: executeChangePasswordMutate, isPending: changingPasswordIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return usePostOnBackend(
      'changePassword',
      {
        body: {
          oldPassword: form.values.currentPassword,
          newPassword: form.values.password,
          matchingNewPassword: form.values.repeatPassword,
        },
        headers: {
          Authorization: useUserSessionStore().token,
          test23: 'tesrt123',
        },
      },
      'WITH_AUTHORIZATION',
    );
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się zmienić hasła.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Udało się zmienić hasło!.',
      description: 'Wprowadź swoje dane aby się zalogować!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się zmienić hasła.',
      description: error.message,
      variant: 'destructive',
    });
  },
});

const { data: resultOfUserQuery } = useQuery({
  queryKey: ['user'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('user', undefined, 'WITH_AUTHORIZATION');
  },
});

const email = computed(() => {
  return resultOfUserQuery?.value?.data?.userDetails?.username;
});
// watch(data, () => {
//   console.log(data);
// });
</script>
