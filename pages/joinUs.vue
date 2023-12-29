<template>
  <div>
    <div class="p-10">
      <div class="flex justify-between">
        <div class="flex items-center space-x-5">
          <NuxtLink :to="browsingStore.lastVisitedNonAuthPage">
            <Button size="icon" variant="ghost">
              <ArrowLeftIcon />
            </Button>
          </NuxtLink>
          <div class="space-y-0.5">
            <h2 id="title" class="text-2xl font-bold tracking-tight">Powrót</h2>
          </div>
        </div>
      </div>
    </div>
    <Separator />
    <div class="container py-10">
      <h1 class="pb-4 text-4xl">Witaj w Petcation</h1>
      <p class="pb-10">
        Jako hotelarz specjalizujący się w opiece nad zwierzętami, masz wyjątkową okazję dołączyć do naszej rosnącej
        społeczności i zaprezentować swój hotel szerszemu gronu klientów. Aby zacząć, prosimy o wypełnienie krótkiego
        formularza zgłoszeniowego. Opowiedz nam o swoim hotelu, unikatowych usługach, które oferujesz, oraz dlaczego
        chcesz być częścią Petcation. Pamiętaj, aby podać swój numer kontaktowy lub adres e-mail, abyśmy mogli się z
        Tobą skontaktować i omówić szczegóły współpracy. Dołącz do nas i pozwól, aby więcej właścicieli zwierząt odkryło
        wyjątkowe miejsce, które stworzyłeś dla ich pupili! Dziękujemy za zainteresowanie Petcation i czekamy na Twoją
        historię!
      </p>

      <form @submit="onSendJoinRequestSubmit">
        <div class="space-y-3 pt-5">
          <FormField v-slot="{ componentField }" name="message">
            <FormItem>
              <FormControl>
                <Textarea class="mb-4" placeholder="Twoje zgłoszenie" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex justify-end">
            <Button class="col-span-3" :disabled="sendingJoinRequestIsLoading" size="lg" type="submit">
              Wyślij formularz
              <Loader2 v-if="sendingJoinRequestIsLoading" class="ml-2 h-4 w-4 animate-spin" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, Loader2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from '@/components/ui/toast';

definePageMeta({
  layout: false,
});
const browsingStore = useBrowsingStore();


const sendingJoinRequestFormSchema = toTypedSchema(
  z.object({
    message: z
      .string({
        required_error: 'Wiadomość jest wymagana',
        invalid_type_error: 'Wiadomość musi być tekstem',
      })
      .min(120, 'Wiadomość musi posiadać minimum 200 znaków ')
      .max(5000, 'Wiadomość może posiadać maximum 5000 znaków '),
  }),
);
const form = useForm({
  validationSchema: sendingJoinRequestFormSchema,
});
const onSendJoinRequestSubmit = form.handleSubmit(() => {
  executeChangePasswordMutate(form.values.message);
});
const { mutate: executeChangePasswordMutate, isPending: sendingJoinRequestIsLoading } = useMutation({
  mutationFn: (message): Promise<unknown> => {
    return useFetch('/api/send', {
      body: {
        message,
      },
      method: 'POST',
    });
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się wysłać formularza.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Udało się wysłać formularz!.',
      description: 'Skontaktujemy się z tobą jak najszybciej!',
    });

    form.resetForm();
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się wysłać formularza.',
      description: error.message,
      variant: 'destructive',
    });
  },
});
</script>
