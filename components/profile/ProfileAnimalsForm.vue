<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Profil </Teleport>
      <Teleport to="#description"> Zarządzaj swoimi zwierzętami </Teleport>
    </ClientOnly>
    <div class="space-y-6">
      <h3 class="pb-5 text-lg font-medium">Twoje zwierzęta</h3>
      <AlertDialog
        :open="isDialogOpen"
        @update:open="
          (open) => {
            isDialogOpen = open;
          }
        "
      >
        <div v-for="(pet, index) in pets" :key="index" class="flex justify-between rounded border p-5">
          <div class="flex items-center gap-2">
            {{ console.log('index and pet', pet) }}
            <BoneIcon v-if="pet.petType === 'DOG'" :class="cn('mr-2 h-4 w-4')" />
            <CatIcon v-if="pet.petType === 'CAT'" :class="cn('mr-2 h-4 w-4')" />

            {{ pet.name }}
          </div>
          <AlertDialogTrigger as-child>
            <Button size="icon" variant="ghost">
              <Trash2 />
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
            <div>
              Czy jesteś pewien że chcesz usunąć
              <span class="font-bold">{{ pet.name }}</span>
              ze swojej listy zwierząt?
              <div class="grid grid-cols-4 gap-4 pt-12">
                <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
                <Button
                  class="col-span-3"
                  :disabled="deleteAnimalIsLoading"
                  :onclick="
                    () =>
                      executeDeleteAnimal(() => ({}), {
                        id: '123',
                      })
                  "
                >
                  Usuń
                  <Loader2 v-if="deleteAnimalIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>
      <Separator />
      <div>
        <h3 class="pb-5 text-lg font-medium">Dodaj nowe zwierzęta</h3>
        <div class="flex space-x-3">
          <form class="flex gap-4" @submit="onAddAnimalFormSubmit">
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
            <FormField v-slot="{ componentField }" name="petName">
              <FormItem>
                <FormControl>
                  <Input placeholder="Imię" type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button class="col-span-3" :disabled="adddingAnimalIsLoading" type="submit">
              Dodaj
              <Loader2 v-if="adddingAnimalIsLoading" class="ml-2 h-4 w-4 animate-spin" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronsUpDown, BoneIcon, CatIcon, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { AlertDialogCancel, AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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

const pets = ref([]);

const { data: resultOfUserPetsQuery, isPending: fetchUserPetsIsLoading } = useQuery({
  queryKey: ['pets'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('pets', undefined, 'WITH_AUTHORIZATION');
  },
});

const addAnmialFormSchema = toTypedSchema(
  z.object({
    petName: z.string({
      required_error: 'Imię zwierzęcia jest wymagane',
      invalid_type_error: 'Imię zwierzęcia musi być tekstem',
    }),
  }),
);
const addAnimalForm = useForm({
  validationSchema: addAnmialFormSchema,
});

const isDialogOpen = ref(false);

watch(resultOfUserPetsQuery, () => {
  if (fetchUserPetsIsLoading.value) {
    return;
  }

  pets.value = resultOfUserPetsQuery?.value.data;
});

const onAddAnimalFormSubmit = addAnimalForm.handleSubmit((values) => {
  executeAddAnimal();
});

const { mutate: executeAddAnimal, isPending: adddingAnimalIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return usePostOnBackend('addModifyPet', {
      body: {},
    });
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się dodać zwierzęcia!.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Udało się dodać zwierzę.',
      description: `Zwierzę ${addAnimalForm.values.petName} został dodany do twoich zwierząt!`,
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się dodać zwierzęcia!.',
      description: error.message,
      variant: 'destructive',
    });
  },
});

const { mutate: executeDeleteAnimal, isPending: deleteAnimalIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    return useDeleteFromBackend('deletePet', {}, 'WITH_AUTHORIZATION');
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się usunąć zwierzęcia!.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Udało się usunąć zwierzę.',
      description: `Zwierzę ${addAnimalForm.values.petName} został dodany do twoich zwierząt!`,
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się usunąć zwierzęcia!.',
      description: error.message,
      variant: 'destructive',
    });
  },
});
</script>
