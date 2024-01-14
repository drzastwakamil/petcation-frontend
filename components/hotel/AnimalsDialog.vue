<template>
  <div>
    <Button
      class="flex gap-4"
      :onclick="
        () => {
          animalsDialogOpen = true;
        }
      "
      variant="outline"
    >
      <div v-if="animalsCount.dogsCount" class="flex items-center gap-1">
        <BoneIcon />
        {{ animalsCount.dogsCount }}}
      </div>

      <div v-if="animalsCount.catsCount" class="flex items-center gap-1">
        <CatIcon />
        {{ animalsCount.catsCount }}
      </div>
      <ArrowRightIcon class="h-4 w-4" />
    </Button>
    <Teleport to="body">
      <AlertDialog :key="reservation?.id" :open="animalsDialogOpen">
        <div class="flex justify-between p-5" rounded>
          <AlertDialogContent>
            <div>
              <AlertDialogDescription class="flex flex-col gap-4">
                <div>
                  <h1 class="text-xl">Dane Właściciela</h1>
                  <h1>{{ owner?.firstName }} {{ owner.lastName }}</h1>
                  <h1>{{ owner?.email }}</h1>
                </div>
                <div
                  v-for="pet in reservation.petDtos"
                  :key="pet.petDto.id"
                  class="flex justify-between border p-5"
                  rounded
                >
                  <div class="flex w-full items-center gap-2">
                    <div class="text-sm text-gray-500">#{{ pet.id }}</div>
                    {{ pet.petDto.name }}
                    <BoneIcon v-if="pet.petDto.petType === 'DOG'" :class="cn('mr-2 h-4 w-4')" />
                    <CatIcon v-if="pet.petDto.petType === 'CAT'" :class="cn('mr-2 h-4 w-4')" />

                    <div class="flex w-full items-center justify-end gap-1">
                      <StarIcon />
                      {{ pet.petDto.averageRate }}
                    </div>
                  </div>
                </div>
              </AlertDialogDescription>
              <div class="grid grid-cols-4 gap-4 pt-12">
                <Button
                  class="col-span-1"
                  :onclick="
                    () => {
                      animalsDialogOpen = false;
                    }
                  "
                  variant="outline"
                >
                  Cofnij
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { BoneIcon, CatIcon, DeleteIcon, HourglassIcon, ArrowRightIcon, StarIcon } from 'lucide-vue-next';
import { ReservationStatus } from '@/types/common';

const props = defineProps<{
  reservation: any;
}>();
const animalsDialogOpen = ref(false);

function reservationPetsCounts(reservation) {
  if (reservation === null || reservation === undefined) {
    return {
      dogsCount: 0,
      catsCount: 0,
    };
  }

  const dogsCount = reservation?.petDtos.reduce((accumulator, currentValue) => {
    if (currentValue.petDto.petType !== 'DOG') {
      return accumulator;
    }

    return accumulator + 1;
  }, 0);
  const catsCount = reservation?.petDtos.reduce((accumulator, currentValue) => {
    if (currentValue.petDto.petType !== 'CAT') {
      return accumulator;
    }

    return accumulator + 1;
  }, 0);

  return {
    dogsCount,
    catsCount,
  };
}

const animalsCount = computed(() => {
  return reservationPetsCounts(props.reservation);
});

const owner = computed(() => {
  return props.reservation.petDtos.at(0)?.petDto?.petOwnerDto ?? null;
});
</script>
