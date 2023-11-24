<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Rezerwacje </Teleport>
      <Teleport to="#description"> Przeglądaj, anuluj, edytuj twoje rezerwacje </Teleport>
    </ClientOnly>
    <div>
      <h3 class="text-lg font-medium">Notifications</h3>
      <p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
    </div>
    <Separator />
    <form class="space-y-8" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="type" type="radio">
        <FormItem class="space-y-3">
          <FormLabel>Notify me about...</FormLabel>
          <FormControl>
            <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
              <FormItem class="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel class="font-normal"> All new messages </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="mentions" />
                </FormControl>
                <FormLabel class="font-normal"> Direct messages and mentions </FormLabel>
              </FormItem>
              <FormItem class="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel class="font-normal"> Nothing </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div>
        <h3 class="mb-4 text-lg font-medium">Email Notifications</h3>
        <div class="space-y-4">
          <FormField v-slot="{ handleChange, value }" name="communication_emails" type="checkbox">
            <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Communication emails </FormLabel>
                <FormDescription> Receive emails about your account activity. </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ handleChange, value }" name="marketing_emails" type="checkbox">
            <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Marketing emails </FormLabel>
                <FormDescription> Receive emails about new products, features, and more. </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ handleChange, value }" name="social_emails" type="checkbox">
            <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Social emails </FormLabel>
                <FormDescription> Receive emails for friend requests, follows, and more. </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ handleChange, value }" name="security_emails" type="checkbox">
            <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
              <div class="space-y-0.5">
                <FormLabel class="text-base"> Security emails </FormLabel>
                <FormDescription> Receive emails about your account activity and security. </FormDescription>
              </div>
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>

      <FormField v-slot="{ handleChange, value }" name="mobile" type="checkbox">
        <FormItem class="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel> Use different settings for my mobile devices </FormLabel>
            <FormDescription>
              You can manage your mobile notifications in the
              <a href="/examples/forms"> mobile settings </a> page.
            </FormDescription>
          </div>
        </FormItem>
      </FormField>

      <div class="flex justify-start">
        <Button type="submit"> Update notifications </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

const notificationsFormSchema = toTypedSchema(
  z.object({
    type: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type.',
    }),
    mobile: z.boolean().default(false).optional(),
    communication_emails: z.boolean().default(false).optional(),
    social_emails: z.boolean().default(false).optional(),
    marketing_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: notificationsFormSchema,
  initialValues: {
    communication_emails: false,
    marketing_emails: false,
    social_emails: true,
    security_emails: true,
  },
});

const onSubmit = handleSubmit((values, { resetForm }) => {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
    ),
  });
});
</script>