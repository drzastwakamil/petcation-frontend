<template>
  <div>
    <CardTitle class="pt-4">Logowanie</CardTitle>
    <CardDescription class="pt-2"> Wprowadź dane logowania. </CardDescription>
    <form @submit="onLoginFormSubmit">
      <div class="space-y-3 pt-5">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Podaj swój email" type="email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Hasło</FormLabel>
            <FormControl>
              <Input placeholder="Wprowadź hasło" type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end">
          <Button
            :onclick="
              () => {
                setCurrentTab('forgotPassword');
              }
            "
            :variant="null"
          >
            <label
              class="cursor-pointer text-right text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Zapomniałeś hasła?
            </label>
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4 pt-12">
        <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
        <Button class="col-span-3" :disabled="buttonDisabled" type="submit">
          Zaloguj
          <Loader2 v-if="loginIsLoading" class="ml-2 h-4 w-4 animate-spin" />
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { useMutation } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { FormField } from '@/components/ui/form';
import { toast } from '@/components/ui/commonToast';

const props = defineProps<{
  setCurrentTab: (tab: string) => void;
  invokationOfSendConfirmEmail: (data: any, toast: any) => void;
}>();
const userSession = useUserSessionStore();

const loginFormSchema = toTypedSchema(
  z.object({
    email: z.coerce.string().email('Wprowadź poprawny format email'),
    password: z
      .string({
        required_error: 'Hasło jest wymagane',
        invalid_type_error: 'Hasło musi być tekstem',
      })
      .min(1, 'Hasło jest wymagane'),
  }),
);

const loginForm = useForm({
  validationSchema: loginFormSchema,
});

const onLoginFormSubmit = loginForm.handleSubmit(() => {
  executeLogInMutate();
});

const { mutate: executeLogInMutate, isPending: loginIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return usePostOnBackend('login', {
      body: {
        email: loginForm.values.email,
        password: loginForm.values.password,
      },
    });
  },
  onSuccess: ({ data, error }) => {
    if (error._object[error?._key]?.message.length) {
      if (error._object[error?._key]?.data?.confirmed === false) {
        props.invokationOfSendConfirmEmail(
          {
            token: null,
            email: loginForm.values.email,
          },
          {
            title: 'Nie udało się zalogować.',
            description: 'Potwierdź swój email aby się zalogować!',
          },
        );
        return;
      }

      toast({
        title: 'Nie udało się zalogować.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Udało się zalogować!',
    });
    userSession.logIn(data.value);
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się zalogować.',
      description: error.message,
      variant: 'destructive',
    });
  },
});

const buttonDisabled = computed(() => {
  return loginIsLoading.value || loginForm.errors.value.email?.length || loginForm.errors.value.password?.length;
});
</script>
