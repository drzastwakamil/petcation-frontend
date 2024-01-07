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
            <div>
              <AnimalsPicker
                v-model:catCount="catsCount"
                v-model:dogCount="dogsCount"
                :max-cats-count="catsRooms?.qty || 0"
                :max-dogs-count="dogsRooms?.qty || 0"
              />
            </div>
            <Separator />
          </CardContent>
          <CardFooter class="space-y-5">
            <div class="flex flex-row justify-between">
              <div class="font-semibold">Razem</div>
              <div>{{ totalPrice }}zł</div>
            </div>
            <Button
              v-if="
                userSession.isLoggedIn &&
                userSession.role === 'user' &&
                !disabledDates.some((disabledDate) => {
                  return isDateInRange(disabledDate, dateRange);
                })
              "
              class="w-full"
              :disabled="!isButtonEnabled"
              size="lg"
            >
              Kontynnuuj</Button
            >
            <div v-else-if="userSession.role != 'user'" class="w-full underline">
              Nie możesz dokonać rezerwacji na koncie hotelu
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
import { DogIcon, CatIcon } from 'lucide-vue-next';
import { useRouteParams, useRouteQuery } from '@vueuse/router';
import { useQuery } from '@tanstack/vue-query';
const userSession = useUserSessionStore();
const hotelId = useRouteParams('hotelId');
const {
  data: resultOfHotelQuery,
  // isPending: hotelQueryIsLoading
} = useQuery({
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
  start: new Date(),
  end: new Date(),
});

const totalPrice = computed(() => {
  return (
    (dogsCount?.value ?? 0) * (dogsRooms?.value?.price ?? 0) + (catsCount?.value ?? 0) * (catsRooms?.value?.price ?? 0)
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
</script>
