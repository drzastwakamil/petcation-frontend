<template>
  <div class="container mx-auto">
    <div class="h-header" />
    <div class="grid grid-cols-7 gap-4 py-10">
      <div class="col-span-5 space-y-8">
        <ImagesCarousel v-if="imagesUrls.length" :images-urls="imagesUrls" />
        <div class="space-y-3">
          <h1 class="text-2xl">{{ hotel?.name || '' }}</h1>
          <p>
            {{ hotel.description }}
          </p>
        </div>
        <div class="space-y-3">
          <h1 class="text-2xl">Lokalizacja</h1>
          <div className="mb-4">
            <p className="text-gray-700 text-base">{{ hotel.addressDto?.street }}</p>
            <p className="text-gray-700 text-base">{{ hotel.addressDto?.city }}, {{ hotel.addressDto?.country }}</p>
          </div>
          <iframe
            allowfullscreen
            class="h-[500px] w-full overflow-hidden rounded-lg"
            frameborder="0"
            referrerpolicy="no-referrer-when-downgrade"
            :src="`https://www.google.com/maps/embed/v1/place?key=AIzaSyBwWgN60dT3J_yh5-ZuxzHIfzEOX1e0b_Q&q=${hotel?.addressDto?.latitude},${hotel?.addressDto?.longitude}`"
            style="border: 0"
          />
        </div>

        <!-- <div class="space-y-3">
          <h1 class="text-2xl">Opinie</h1>
          <ReviewsMasonry />
        </div> -->
      </div>
      <div class="col-span-2">
        <Card class="flex flex-col overflow-hidden border">
          <CardHeader>
            <CardTitle> Cennik </CardTitle>
            <CardDescription class="flex flex-col gap-2 pt-3">
              <div class="flex">
                <template v-if="dogsRooms">
                  <DogIcon class="mr-1 h-5 w-5" /> Pies - {{ dogsRooms.price }} zł noc
                </template>
              </div>

              <div class="flex">
                <template v-if="catsRooms">
                  <CatIcon class="mr-1 h-5 w-5" /> Kot - {{ catsRooms.price }} zł noc
                </template>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-3">
            <DatePicker v-model="dateRange" class="w-full" :disabled-dates="disabledDates" />
            <AnimalsPicker
              v-model:catCount="catsCount"
              v-model:dogCount="dogsCount"
              class="w-full"
              :max-cats-count="catsRooms?.qty || 0"
              :max-dogs-count="dogsRooms?.qty || 0"
            />
            <Separator />
          </CardContent>
          <CardFooter class="space-y-5">
            <div class="flex flex-row justify-between">
              <div class="font-semibold">Razem</div>
              <div>{{ totalPrice }}zł</div>
            </div>

            <AlertDialog
              v-if="
                userSession.isLoggedIn &&
                userSession.role === 'user' &&
                !disabledDates.some((disabledDate) => {
                  return isDateInRange(disabledDate, dateRange);
                })
              "
              :open="isDialogOpen"
              @update:open="
                (open) => {
                  isDialogOpen = open;
                }
              "
            >
              <AlertDialogTrigger as-child>
                <Button
                  class="w-full"
                  :disabled="!isButtonEnabled"
                  :onclick="
                    () => {
                      selectedCats = Array.from(Array(catsCount).keys()).map(() => null);
                      selectedDogs = Array.from(Array(dogsCount).keys()).map(() => null);
                      refetchUserAnimals();
                    }
                  "
                  size="lg"
                >
                  Kontynnuuj
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader class="text-lg"> Zarezerwuj pobyt </AlertDialogHeader>
                <Label class="pb-6">Termin: {{ formatDateRange(dateRange) }}</Label>
                <div v-if="catsCount > 0" class="flex flex-col space-y-1.5 pb-6">
                  <Label>
                    <span> <CatIcon class="inline-flex h-4" /> Koty </span>
                  </Label>

                  <Select
                    v-for="(_, index) in catsCount"
                    v-if="catsPool.length"
                    :key="index"
                    :model-value="selectedCats[index] || ''"
                    @update:model-value="
                      (value) => {
                        var tempCats = selectedCats;
                        tempCats[index] = value;
                        selectedCats = tempCats;
                      }
                    "
                  >
                    <div class="flex gap-4">
                      <SelectTrigger :id="`catsPicker${index}`">
                        <SelectValue placeholder="Wybierz kota" />
                      </SelectTrigger>

                      <Button
                        :disabled="selectedCats[index] === null"
                        :onclick="
                          () => {
                            var tempCats = selectedCats;
                            tempCats[index] = null;
                            selectedCats = tempCats;
                          }
                        "
                        size="icon"
                        variant="ghost"
                      >
                        <XIcon />
                      </Button>
                    </div>
                    <SelectContent position="popper">
                      <SelectItem
                        v-for="cat in catsPool"
                        :key="cat.id"
                        :disabled="selectedCats.includes(cat.id)"
                        :value="cat.id"
                      >
                        {{ cat.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <TooltipProvider v-else>
                    <Tooltip>
                      <TooltipTrigger>
                        <div class="flex gap-2">
                          <AlertCircleIcon class="text-red-300" />
                          <p class="text-left">Nie znaleziono kotów na twoim profilu</p>
                        </div></TooltipTrigger
                      >
                      <TooltipContent>
                        <NuxtLink class="underline" to="/settings/animals">
                          Aby zarezerwować pobyt dla kota musisz dodać go do listy swoich zwierząt
                        </NuxtLink>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div v-if="dogsCount > 0" class="flex flex-col space-y-1.5">
                  <Label for="framework">
                    <span> <BoneIcon class="inline-flex h-4" /> Psy </span>
                  </Label>

                  <Select
                    v-for="(_, index) in dogsCount"
                    v-if="dogsPool.length"
                    :key="index"
                    :model-value="selectedDogs[index] || ''"
                    @update:model-value="
                      (value) => {
                        var tempDogs = selectedDogs;
                        tempDogs[index] = value;
                        selectedDogs = tempDogs;
                      }
                    "
                  >
                    <div class="flex gap-4">
                      <SelectTrigger :id="`dogsPicker${index}`">
                        <SelectValue placeholder="Wybierz psa" />
                      </SelectTrigger>

                      <Button
                        :disabled="selectedDogs[index] === null"
                        :onclick="
                          () => {
                            var tempDogs = selectedDogs;
                            selectedDogs[index] = null;
                            selectedDogs = tempDogs;
                          }
                        "
                        size="icon"
                        variant="ghost"
                      >
                        <XIcon />
                      </Button>
                    </div>
                    <SelectContent position="popper">
                      <SelectItem
                        v-for="dog in dogsPool"
                        :key="dog.id"
                        :disabled="selectedDogs.includes(dog.id)"
                        :value="dog.id"
                      >
                        {{ dog.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <TooltipProvider v-else>
                    <Tooltip>
                      <TooltipTrigger>
                        <div class="flex gap-2">
                          <AlertCircleIcon class="text-red-300" />
                          <p class="text-left">Nie znaleziono psów na twoim profilu</p>
                        </div></TooltipTrigger
                      >
                      <TooltipContent>
                        <NuxtLink class="underline" to="/settings/animals">
                          Aby zarezerwować pobyt dla psa musisz dodać go do listy swoich zwierząt
                        </NuxtLink>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <AlertDialogFooter>
                  <div class="grid w-full grid-cols-4 gap-4 pt-12">
                    <AlertDialogCancel class="col-span-1"> Anuluj </AlertDialogCancel>
                    <Button
                      class="col-span-3"
                      :disabled="
                        selectedDogs.every((dogId) => dogId === null) && selectedCats.every((catId) => catId === null)
                      "
                      :onclick="
                        () => {
                          executeAddReservationMutate();
                        }
                      "
                    >
                      Rezerwuj
                      <Loader2 v-if="addingReservationIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                    </Button>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div v-else-if="userSession.role == 'hotel'" class="w-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div class="flex gap-2">
                      <AlertCircleIcon class="text-red-300" />
                      <p class="text-left">Nie możesz dokonać rezerwacji poprzez konto hotelu</p>
                    </div></TooltipTrigger
                  >
                  <TooltipContent>
                    <p class="underline">
                      Aby dokonać rezerwacji wyloguj się z konta hotelu i zaloguj na konto użytkownika
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button
              v-else
              class="w-full"
              :onclick="
                () => {
                  userSession.openLoginModal();
                }
              "
              size="lg"
            >
              Zaloguj się, aby kontynuować
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DogIcon, CatIcon, AlertCircleIcon, Loader2, XIcon, BoneIcon } from 'lucide-vue-next';
import { useRouteParams, useRouteQuery } from '@vueuse/router';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { addDays } from 'date-fns';
import { toast } from '@/components/ui/commonToast';
const userSession = useUserSessionStore();
const hotelId = useRouteParams('hotelId');
const startDate = useRouteParams('dateStart');
const endDate = useRouteParams('dateEnd');

const { data: resultOfHotelQuery, isPending: hotelQueryIsLoading } = useQuery({
  queryKey: [`hotel${hotelId.value}`],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('hotel', {
      query: {
        id: hotelId.value,
      },
    });
  },
});
const hotel = computed(() => resultOfHotelQuery?.value?.data ?? {});
const imagesUrls = computed(() => {
  return (hotel.value?.images || []).map((image) => {
    return image.url;
  });
});

const dogsRooms = computed(() => {
  return (hotel?.value?.allAvailableRoomsByPetType || []).find((val) => {
    return val?.petType === 'DOG';
  });
});

const catsRooms = computed(() => {
  return (hotel?.value?.allAvailableRoomsByPetType || []).find((val) => {
    return val?.petType === 'CAT';
  });
});

const withDogs = computed(() => {
  return !!dogsRooms.value;
});

const withCats = computed(() => {
  return !!catsRooms.value;
});
const dogsCount = ref(useRouteQuery('dogsCount').value);
const catsCount = ref(useRouteQuery('catsCount').value);
const dateRange = ref({
  start: startDate.value ? new Date(startDate.value) : new Date(),
  end: endDate.value ? new Date(endDate.value) : addDays(new Date(), 1),
});
function countDatesInclusive(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInDays = Math.round(Math.abs((start - end) / oneDay));

  return diffInDays;
}
const totalPrice = computed(() => {
  return (
    (dogsCount?.value ?? 0) *
      (dogsRooms?.value?.price ?? 0) *
      countDatesInclusive(dateRange.value.start, dateRange.value.end) +
    (catsCount?.value ?? 0) *
      (catsRooms?.value?.price ?? 0) *
      countDatesInclusive(dateRange.value.start, dateRange.value.end)
  );
});

const isButtonEnabled = computed(() => {
  if (withDogs.value && withCats.value) {
    return dogsCount.value > 0 || catsCount.value > 0;
  }

  if (withDogs.value) {
    return dogsCount.value > 0;
  }

  return catsCount.value > 0;
});

const disabledDates = computed(() => {
  const freeDatesList = hotel?.value?.freeDatesList ?? {};
  return Object.entries(freeDatesList)
    .map(([key, value]) => {
      const catsRoom = (value || []).find((val) => {
        return val?.petType === 'CAT';
      });
      const dogsRoom = (value || []).find((val) => {
        return val?.petType === 'DOG';
      });
      return {
        date: key,
        catsRoom,
        dogsRoom,
      };
    })
    .filter((value) => {
      return (
        (value?.catsRoom?.qty || 0) < (catsCount.value || 0) || (value?.dogsRoom?.qty || 0) < (dogsCount.value || 0)
      );
    })
    .map((value) => {
      return new Date(value.date);
    });
});

function compareDates(date1: Date, date2: Date) {
  // Convert date1 to a common format: YYYY-MM-DD
  const convertedDate1 = new Date(date1).toISOString().split('T')[0];

  // Convert date2 to a common format: YYYY-MM-DD
  const convertedDate2 = new Date(date2).toISOString().split('T')[0];

  if (convertedDate1 < convertedDate2) {
    return -1;
  } else if (convertedDate1 > convertedDate2) {
    return 1;
  } else {
    return 0;
  }
}
function isDateInRange(date: Date, dateRange: { start: Date; end: Date }) {
  return compareDates(date, dateRange.start) >= 0 && compareDates(date, dateRange.end) <= 0;
}
const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return formatter.format(date);
};
function formatDateRange(dateRange) {
  const startDateString = formatDate(dateRange.startDate);
  const endDateString = formatDate(dateRange.endDate);

  return startDateString + ' - ' + endDateString;
}
const {
  data: resultOfUserPetsQuery,
  isPending: fetchUserPetsIsLoading,
  refetch: refetchUserAnimals,
} = useQuery({
  queryKey: ['usersPets'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('usersPets', undefined, 'WITH_AUTHORIZATION');
  },
});

const selectedCats = ref<Array<number | null>>([]);
const catsPool = computed(() => {
  return (resultOfUserPetsQuery?.value?.data || []).filter((animal) => animal.petType === 'CAT');
});

const selectedDogs = ref<Array<number | null>>([]);
const dogsPool = computed(() => {
  return (resultOfUserPetsQuery?.value?.data || []).filter((animal) => animal.petType === 'DOG');
});
const isDialogOpen = ref(false);

const { mutate: executeAddReservationMutate, isPending: addingReservationIsLoading } = useMutation({
  mutationFn: (): Promise<unknown> => {
    console.log('fromattt');
    return usePostOnBackend(
      'addReservation',
      {
        body: {
          petIds: [
            ...selectedCats.value.filter((catId) => {
              return catId !== null;
            }),
            ...selectedDogs.value.filter((dogId) => {
              return dogId !== null;
            }),
          ],
          hotelId: parseInt(hotelId.value),
          from: dateRange.value.start.toISOString().split('T')[0],
          to: dateRange.value.end.toISOString().split('T')[0],
        },
      },
      'WITH_AUTHORIZATION',
    );
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się dodać rezerwacji.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }

    isDialogOpen.value = false;
    toast({
      title: 'Rezerwacja dodana!',
      description: 'Przejdź do profilu aby zobaczyć jej status',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się dodać rezerwacji.',
      description: error.message,
      variant: 'destructive',
    });
  },
});
</script>
