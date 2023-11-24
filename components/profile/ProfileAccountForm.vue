<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Konto </Teleport>
      <Teleport to="#description"> Zarządzaj swoim kontem </Teleport>
    </ClientOnly>
    <div>
      <h3 class="text-lg font-medium">Account</h3>
      <p class="text-sm text-muted-foreground">
        Update your account settings. Set your preferred language and timezone.
      </p>
    </div>
    <Separator />
    <Form v-slot="{ setValues }" class="space-y-8" :validation-schema="accountFormSchema" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Your name" type="text" v-bind="componentField" />
          </FormControl>
          <FormDescription> This is the name that will be displayed on your profile and in emails. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField, value }" name="dob">
        <FormItem>
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  :class="cn('w-[280px] pl-3 text-left font-normal', !value && 'text-muted-foreground')"
                  variant="outline"
                >
                  <span>{{ value ? format(value, 'PPP') : 'Pick a date' }}</span>
                  <CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <Calendar v-bind="componentField" />
            </PopoverContent>
          </Popover>
          <FormDescription> Your date of birth is used to calculate your age. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value }" name="language">
        <FormItem>
          <FormLabel>Language</FormLabel>

          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  :aria-expanded="open"
                  :class="cn('w-[200px] justify-between', !value && 'text-muted-foreground')"
                  role="combobox"
                  variant="outline"
                >
                  {{ value ? languages.find((language) => language.value === value)?.label : 'Select language...' }}

                  <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search language..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="language in languages"
                    :key="language.value"
                    :value="language.label"
                    @select="
                      () => {
                        setValues({
                          language: language.value,
                        });
                        open = false;
                      }
                    "
                  >
                    <Check :class="cn('mr-2 h-4 w-4', value === language.value ? 'opacity-100' : 'opacity-0')" />
                    {{ language.label }}
                  </CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormDescription> This is the language that will be used in the dashboard. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-start">
        <Button type="submit"> Update account </Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import * as z from 'zod';
import { format } from 'date-fns';
import { toTypedSchema } from '@vee-validate/zod';
import { configure } from 'vee-validate';
import { Check, ChevronsUpDownIcon, CalendarIcon } from 'lucide-vue-next';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const open = ref(false);

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
];
const accountFormSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters.',
      })
      .max(30, {
        message: 'Name must not be longer than 30 characters.',
      }),
    dob: z.date({
      required_error: 'A date of birth is required.',
    }),
    language: z.string().nonempty({
      message: 'Please select a language.',
    }),
  }),
);

// const filterFunction = (list: typeof languages, search: string) =>
//   list.filter((i) => i.value.toLowerCase().includes(search.toLowerCase()));

// // https://github.com/logaretm/vee-validate/issues/3521
// // https://github.com/logaretm/vee-validate/discussions/3571
// async function onSubmit(values: any) {
//   toast({
//     title: 'You submitted the following values:',
//     description: h(
//       'pre',
//       { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
//       h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
//     ),
//   });
// }
</script>