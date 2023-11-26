<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Profil </Teleport>
      <Teleport to="#description"> Zarządzaj swoimi zwierzętami </Teleport>
    </ClientOnly>
    <div class="space-y-6">
      <h3 class="pb-5 text-lg font-medium">Twoje zwierzęta</h3>
      <Separator />
      <div>
        <h3 class="pb-5 text-lg font-medium">Dodaj nowe zwierzęta</h3>
        <div class="flex space-x-3">
          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <Button :aria-expanded="open" class="w-[200px] justify-between" role="combobox" variant="outline">
                <div class="flex">
                  <BoneIcon v-if="value?.value === 'DOG'" :class="cn('mr-2 h-4 w-4')" />
                  <CatIcon v-if="value?.value === 'CAT'" :class="cn('mr-2 h-4 w-4')" />
                  {{ value ? value.label : 'Zwierzę' }}
                </div>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  <CommandItem
                    v-for="animal in animalsPool"
                    :key="animal.value"
                    :value="animal"
                    @select="
                      (ev) => {
                        value = ev.detail.value as typeof animal;
                        open = false;
                      }
                    "
                  >
                    <BoneIcon v-if="animal.value === 'DOG'" :class="cn('mr-2 h-4 w-4')" />
                    <CatIcon v-if="animal.value === 'CAT'" :class="cn('mr-2 h-4 w-4')" />
                    {{ animal.label }}
                  </CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <form>
            <FormField v-slot="{ componentField }" name="petName">
              <FormItem>
                <FormControl>
                  <Input placeholder="Imię" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronsUpDown, BoneIcon, CatIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const animalsPool = [
  { value: 'DOG', label: 'Pies' },
  { value: 'CAT', label: 'Kot' },
];

const open = ref(false);
const value = ref<(typeof animalsPool)[number]>(animalsPool[0]);

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

const onChangePasswordFormSubmit = form.handleSubmit(() => {});
</script>
