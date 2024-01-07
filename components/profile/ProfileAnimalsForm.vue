<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Profil </Teleport>
      <Teleport to="#description"> Zarządzaj swoimi zwierzętami </Teleport>
    </ClientOnly>
    <div class="space-y-6">
      <div>
        <h3 class="pb-5 text-lg font-medium">Dodaj nowe zwierzęta</h3>
        <div class="flex space-x-3">
          <form class="flex gap-4" @submit="onAddAnimalFormSubmit">
            <Popover v-model:open="open">
              <PopoverTrigger as-child>
                <Button :aria-expanded="open" class="w-[200px] justify-between" role="combobox" variant="outline">
                  <div class="flex">
                    <BoneIcon v-if="petType?.value === 'DOG'" :class="cn('mr-2 h-4 w-4')" />
                    <CatIcon v-if="petType?.value === 'CAT'" :class="cn('mr-2 h-4 w-4')" />
                    {{ value ? petType.label : 'Zwierzę' }}
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
                          petType = ev.detail.value as typeof animal;
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
            <Button class="col-span-3" :disabled="addingAnimalIsLoading" type="submit">
              Dodaj
              <Loader2 v-if="addingAnimalIsLoading" class="ml-2 h-4 w-4 animate-spin" />
            </Button>
          </form>
        </div>
      </div>
      <Separator />
      <h3 class="pb-5 text-lg font-medium">Twoje zwierzęta</h3>

      <AlertDialog v-for="pet in pets" :key="pet.id">
        <div class="flex justify-between border p-5" rounded>
          <div class="flex items-center gap-2">
            <div class="text-sm text-gray-500">#{{ pet.id }}</div>
            {{ pet.name }}
            <BoneIcon v-if="pet.petType === 'DOG'" :class="cn('mr-2 h-4 w-4')" />
            <CatIcon v-if="pet.petType === 'CAT'" :class="cn('mr-2 h-4 w-4')" />
          </div>
          <AlertDialogTrigger as-child>
            <Button size="icon" variant="ghost">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div>
              Czy jesteś pewien że chcesz usunąć
              <span class="font-bold">{{ pet.name }}</span>
              ze swojej listy zwierząt?
              <div class="grid grid-cols-4 gap-4 pt-12">
                <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
                <Button
                  class="col-span-3"
                  :disabled="deleteAnimalIsLoading"
                  :onclick="() => executeDeleteAnimal({ id: pet.id })"
                  variant="destructive"
                >
                  Usuń
                  <Loader2 v-if="deleteAnimalIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronsUpDown, BoneIcon, CatIcon, Trash2, Loader2 } from 'lucide-vue-next';
import { ref } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { FormField } from '@/components/ui/form';
import { toast } from '@/components/ui/commonToast';

const animalsPool = [
  { value: 'DOG', label: 'Pies' },
  { value: 'CAT', label: 'Kot' },
];

const open = ref(false);
const petType = ref<(typeof animalsPool)[number]>(animalsPool[0]);
const pets = ref([]);

const {
  data: resultOfUserPetsQuery,
  isPending: fetchUserPetsIsLoading,
  refetch,
} = useQuery({
  queryKey: ['usersPets'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('usersPets', undefined, 'WITH_AUTHORIZATION');
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

watch(resultOfUserPetsQuery, () => {
  if (fetchUserPetsIsLoading.value) {
    return;
  }

  pets.value = resultOfUserPetsQuery?.value.data;
});

const onAddAnimalFormSubmit = addAnimalForm.handleSubmit((_) => {
  executeAddAnimal();
});

const { mutate: executeAddAnimal, isPending: addingAnimalIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    const { petName } = addAnimalForm.values;
    return usePostOnBackend(
      'addModifyPet',
      {
        body: {
          name: petName,
          petType: petType.value.value,
        },
      },
      'WITH_AUTHORIZATION',
    );
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
    refetch();
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
  mutationFn: (variables): Promise<unknown> => {
    return useDeleteFromBackend(
      'deletePet',
      {
        params: {
          id: variables.id,
        },
      },
      'WITH_AUTHORIZATION',
    );
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

    refetch();

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
