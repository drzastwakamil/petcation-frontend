<template>
  <div class="container mx-auto">
    <div class="h-header" />
    <div class="flex justify-center gap-2 pt-10">
      <Combobox />
      <DatePicker v-model="dateRange" />
      <AnimalsPicker v-model:catCount="catsCount" v-model:dogCount="dogsCount" />
    </div>
    <div v-if="hotelsQueryIsLoading" class="flex justify-center py-10">
      <Loader2 class="h-20 w-20 animate-spin text-[#C28686]" />
    </div>
    <div v-else class="grid grid-cols-4 gap-5 py-10">
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.id"
        :description="hotel.description || ''"
        :link="{
          path: `/hotels/${hotel.id}`,
          query: {
            dateStart,
            dateEnd,
            dogsCount,
            catsCount,
          },
        }"
        :location="formatAddress(hotel.addressDto)"
        :photo-url="hotel.images[0]?.url"
        :price-per-night="150"
        :price-total="7 * 150"
        :range="8.5"
        :review-average="4.56"
        :title="hotel.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import { addDays } from 'date-fns';
import { useQuery } from '@tanstack/vue-query';

const dogsCount = ref(0);
const catsCount = ref(0);

interface Address {
  street?: string;
  city?: string;
  country?: string;
}

// Function to convert the address object into a string
function formatAddress(address: Address): string {
  // Construct the address string only with the available properties
  const addressParts = [address.street, address.city, address.country].filter((part) => part !== undefined);

  return addressParts.join(', ');
}
// Initial date rang/ Reactive state for the date range
const dateRange = ref({
  start: new Date(),
  end: addDays(new Date(), 20),
});
function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const dateStart = computed(() => formatDate(dateRange.value.start));
const dateEnd = computed(() => formatDate(dateRange.value.end));

const queryBody = computed(() => {
  const dogs = dogsCount.value;
  const cats = catsCount.value;

  return {
    from: dateStart.value,
    to: dateEnd.value,
    maxDistance: '50',
    lat: '0',
    lon: '0',
    petTypeQtyDtoList: [
      {
        petType: 'DOG',
        qty: dogs,
      },

      {
        petType: 'CAT',
        qty: cats,
      },
    ],
  };
});

const {
  data: resultOfHotelsQuery,
  isPending: hotelsQueryIsLoading,
  refetch,
} = useQuery({
  queryKey: ['hotels'],
  queryFn: (): Promise<unknown> => {
    const body = queryBody.value;
    return usePostOnBackend('hotels', {
      body,
    });
  },
});
const hotels = computed(() => resultOfHotelsQuery?.value?.data ?? []);

const invokeRefetch = useThrottleFn(() => {
  refetch();
}, 250);

watch(
  queryBody,
  () => {
    invokeRefetch();
  },
  { deep: true },
);
</script>
