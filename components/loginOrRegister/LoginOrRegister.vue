<template>
  <AlertDialog
    :open="isDialogOpen"
    @update:open="
      (open) => {
        isDialogOpen = open;
        resetAskingForResetPasswordEmailProcess();
      }
    "
  >
    <AlertDialogTrigger as-child>
      <Button size="icon" variant="ghost">
        <LogIn />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent
      :on-outside-dialog-click="
        () => {
          if (isDialogOpen) {
            isDialogOpen = false;
          }
        }
      "
    >
      <Tabs
        :model-value="currentTab"
        @update:model-value="
          (modelValue) => {
            currentTab = modelValue;
          }
        "
      >
        <div v-if="currentTab === 'forgotPassword' || currentTab === 'confirmEmail'">
          <Button
            :onclick="
              () => {
                currentTab = 'login';
                resetAskingForResetPasswordEmailProcess();
              }
            "
            size="icon"
            variant="ghost"
          >
            <ArrowLeftIcon />
          </Button>
        </div>
        <TabsList v-else class="grid w-full grid-cols-2">
          <TabsTrigger value="login"> Logowanie </TabsTrigger>
          <TabsTrigger value="register"> Rejestracja </TabsTrigger>
        </TabsList>

        <TabsContent value="forgotPassword">
          <div v-if="resetPasswordMailHasBeenTriedToBeSend">
            <CardTitle class="pt-4">Sprawdź swój email</CardTitle>
            <CardDescription class="pt-2">
              Otrzymasz wiadomość, z kolejnymi krokami aby ustawić nowe hasło.
            </CardDescription>
            <div class="flex justify-end space-y-3 pt-5">
              <Button :disabled="askingForResetPasswordEmailIsLoading" :onclick="executeAskForResetPasswordEmail">
                Wyślij email ponownie!
                <Loader2 v-if="askingForResetPasswordEmailIsLoading" class="ml-2 h-4 w-4 animate-spin" />
              </Button>
            </div>
          </div>
          <div v-else>
            <CardTitle class="pt-4">Zapomniałeś hasła?</CardTitle>
            <CardDescription class="pt-2"> Podaj swój email, aby ustawić nowe hasło. </CardDescription>
            <div class="space-y-3 pt-5">
              <div class="space-y-1">
                <Label for="email"> Email </Label>
                <Input id="email" placeholder="Podaj swój email" type="email" />
              </div>
            </div>

            <div class="grid grid-cols-4 gap-4 pt-12">
              <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
              <Button
                class="col-span-3"
                :disabled="askingForResetPasswordEmailIsLoading"
                :onclick="executeAskForResetPasswordEmail"
              >
                Odzyskaj hasło
                <Loader2 v-if="askingForResetPasswordEmailIsLoading" class="ml-2 h-4 w-4 animate-spin" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="confirmEmail">
          <div>
            <CardTitle class="pt-4">Sprawdź swój email</CardTitle>
            <CardDescription class="pt-2">
              Otrzymasz wiadomość, z instrukcjami aby potwierdzić swój email
            </CardDescription>
            <div class="flex justify-end space-y-3 pt-5">
              <Button
                :disabled="sendingConfirmEmailIsLoading"
                :onclick="
                  () => {
                    invokationOfSendConfirmEmail({
                      email: registerForm.values.email || emailCache || 'emailNotFound',
                    });
                  }
                "
              >
                Wyślij email ponownie!
                <Loader2 v-if="sendingConfirmEmailIsLoading" class="ml-2 h-4 w-4 animate-spin" />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="login">
          <LoginForm
            :invokation-of-send-confirm-email="invokationOfSendConfirmEmail"
            :set-current-tab="
              (tab: string) => {
                currentTab = tab;
              }
            "
          />
        </TabsContent>
        <TabsContent value="register">
          <CardTitle class="pt-4">Rejestracja</CardTitle>
          <CardDescription class="pt-2"> Podaj swoje dane, aby się zarejestrować. </CardDescription>

          <form @submit="onRegisterFormSubmit">
            <div class="space-y-3 pt-5">
              <FormField v-slot="{ componentField }" name="firstName">
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Podaj swoje imię" type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="lastName">
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="Podaj swoje nazwisko" type="text" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

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
                    <Input placeholder="Podaj hasło" type="password" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="repeatPassword">
                <FormItem>
                  <FormControl>
                    <Input placeholder="Powtórz hasło" type="password" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ value, handleChange }" name="termsAndConditions">
                <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox :checked="value" @update:checked="handleChange" />
                  </FormControl>
                  <div class="space-y-1 leading-none">
                    <FormLabel>
                      <span>
                        Akceptuję
                        <NuxtLink class="underline" target="_blank" to="/statue.pdf">Regulamin</NuxtLink>
                        serwisu oraz
                        <NuxtLink class="underline" target="_blank" to="/privacy-policy.pdf">
                          Politykę prywatności
                        </NuxtLink>
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              </FormField>
            </div>
            <div class="grid grid-cols-4 gap-4 pt-12">
              <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
              <Button class="col-span-3" :disabled="registerButtonDisabled" type="submit">
                Zarejestruj
                <Loader2 v-if="registerIsLoading" class="ml-2 h-4 w-4 animate-spin" />
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { LogIn, Loader2, ArrowLeftIcon } from 'lucide-vue-next';
import { useMutation } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/commonToast';
import { FormField } from '@/components/ui/form';

import { useUserSessionStore } from '#imports';

const isDialogOpen = ref(false);
const currentTab = ref('login');

const registerFormSchema = toTypedSchema(
  z
    .object({
      firstName: z.string({
        required_error: 'Imię jest wymagane',
        invalid_type_error: 'Imię musi być tekstem',
      }),
      lastName: z.string({
        required_error: 'Nazwisko jest wymagane',
        invalid_type_error: 'Imię musi być tekstem',
      }),
      email: z.coerce.string().email('Wprowadź poprawny format email'),
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
      termsAndConditions: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
          message: 'Musisz zaakceptować warunki.',
          path: ['termsAndConditions'],
        }),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Hasła nie są identyczne!',
      path: ['repeatPassword'],
    }),
);
const registerForm = useForm({
  validationSchema: registerFormSchema,
});

const onRegisterFormSubmit = registerForm.handleSubmit((_) => {
  executeRegisterMutate();
});

let sendConfirmEmailCallback: (() => void) | null = null;
let emailCache: string | null = null;
const invokationOfSendConfirmEmail = (data, toastData) => {
  emailCache = data.email;
  sendConfirmEmailCallback = () => {
    if (toastData) {
      toast(toastData);
    }
    currentTab.value = 'confirmEmail';
  };
  executeSendConfirmEmail(data);
};

const { mutate: executeRegisterMutate, isPending: registerIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return usePostOnBackend('signup', {
      body: {
        email: registerForm.values.email,
        firstName: registerForm.values.firstName,
        lastName: registerForm.values.lastName,
        password: registerForm.values.password,
        matchingPassword: registerForm.values.repeatPassword,
        addressDto: {
          phoneNumber: 'none',
          street: 'none',
          city: 'none',
          country: 'none',
          latitude: 0,
          longitude: 0,
        },
        pets: [],
      },
    });
  },
  onSuccess: (response) => {
    const { error, data } = response;
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się zarejestrować.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    invokationOfSendConfirmEmail(
      {
        email: registerForm.values.email,
      },
      {
        title: 'Udało się zarejestrować.',
        description: 'Potwierdź swój email aby się zalogować!',
      },
    );
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się zarejestrować.',
      description: error.message,
      variant: 'destructive',
    });
  },
});

const registerButtonDisabled = computed(() => {
  return (
    registerIsLoading.value ||
    registerForm.errors.value.firstName?.length ||
    registerForm.errors.value.lastName?.length ||
    registerForm.errors.value.email?.length ||
    registerForm.errors.value.password?.length ||
    registerForm.errors.value.repeatPassword?.length ||
    registerForm.errors.value.termsAndConditions?.length
  );
});

const resetPasswordMailHasBeenTriedToBeSend = ref(false);
const {
  mutate: executeAskForResetPasswordEmail,
  isPending: askingForResetPasswordEmailIsLoading,
  reset: resetAskForResetPasswordEmailMutation,
} = useMutation({
  mutationFn: () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  },
  onSuccess: () => {
    resetPasswordMailHasBeenTriedToBeSend.value = true;
  },
});

const resetAskingForResetPasswordEmailProcess = () => {
  resetAskForResetPasswordEmailMutation();
  currentTab.value = 'login';
  resetPasswordMailHasBeenTriedToBeSend.value = false;
};
const userSessionStore = useUserSessionStore();
userSessionStore.$onAction(({ name }) => {
  if (name === 'openLoginModal') {
    isDialogOpen.value = true;
  }
});

const { mutate: executeSendConfirmEmail, isPending: sendingConfirmEmailIsLoading } = useMutation({
  mutationFn: (data): Promise<unknown> => {
    return useFetch('/api/sendConfirmEmail', {
      body: {
        ...data,
      },
      method: 'POST',
    });
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się wysłać maila.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    if (sendConfirmEmailCallback) {
      sendConfirmEmailCallback();
      return;
    }
    toast({
      title: 'Udało się wysłać mail z potwierdzeniem!.',
      description: 'Sprawdź swoją skrzynkę!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się wysłać maila.',
      description: error.message,
      variant: 'destructive',
    });
  },
});
</script>
