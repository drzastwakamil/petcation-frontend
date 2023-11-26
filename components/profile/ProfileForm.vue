<template>
  <div class="space-y-6">
    <ClientOnly>
      <Teleport to="#title"> Profil </Teleport>
      <Teleport to="#description"> Dostosuj swój profil </Teleport>
    </ClientOnly>

    <form @submit="onUserUpdateFormSubmit">
      <h3 class="pb-5 text-lg font-medium">Dane osobowe</h3>
      <div class="space-y-3">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>Imię</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Podaj swoje imię" type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Nazwisko</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Podaj swoje nazwisko" type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="grid grid-cols-4 gap-4 pt-12">
          <div />
          <Button class="col-span-3" :disabled="updateUserIsLoading" type="submit">
            Zapisz
            <Loader2 v-if="updateUserIsLoading" class="ml-2 h-4 w-4 animate-spin" />
          </Button>
        </div>
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
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const { toast } = useToast();

const changePasswordFormSchema = toTypedSchema(
  z.object({
    firstName: z
      .string({
        required_error: 'Imię jest wymagane',
        invalid_type_error: 'Imię musi być tekstem',
      })
      .min(1, 'Imię jest wymagane'),
    lastName: z
      .string({
        required_error: 'Nazwisko jest wymagane',
        invalid_type_error: 'Imię musi być tekstem',
      })
      .min(1, 'Nazwisko jest wymagane'),
  }),
);

const { data: resultOfUserQuery, isPending: fetchUserIsLoading } = useQuery({
  queryKey: ['user'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('user', undefined, 'WITH_AUTHORIZATION');
  },
});
const form = useForm({
  validationSchema: changePasswordFormSchema,
});

const onUserUpdateFormSubmit = form.handleSubmit(() => {
  executeUpdateUserMutate();
});

const { mutate: executeUpdateUserMutate, isPending: updateUserIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return usePostOnBackend(
      'modifyUser',
      {
        body: {
          firstName: form.values.firstName,
          lastName: form.values.lastName,
          addressDto: {
            phoneNumber: '',
            street: '',
            city: '',
            country: '',
            latitude: '',
            longitude: '',
          },
        },
      },
      'WITH_AUTHORIZATION',
    );
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się zaaktualizować profilu.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Profil Zaaktualizowany!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się zaaktualizować profilu.',
      description: error.message,
      variant: 'destructive',
    });
  },
});

watch(resultOfUserQuery, () => {
  if (fetchUserIsLoading.value) {
    return;
  }

  console.log('d');
  form.setValues({
    firstName: resultOfUserQuery?.value?.data?.firstName,
    lastName: resultOfUserQuery?.value?.data?.lastName,
  });
});
</script>
