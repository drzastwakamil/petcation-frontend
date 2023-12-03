<template>
  <div class="container mx-auto">
    <div class="h-header" />
    <div class="flex justify-center gap-2 pt-10">
      <Combobox /> <DatePicker /> <AnimalsPicker :cat-count="catsCount" :dog-count="dogsCount" />
    </div>
    <div class="grid grid-cols-4 gap-5 py-10">
      <HotelCard
        v-for="hotel in hotels"
        :key="hotel.id"
        :description="hotel.description || ''"
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
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const { data: resultOfHotelsQuery, isPending: hotelsQueryIsLoading } = useQuery({
  queryKey: ['hotels'],
  queryFn: (): Promise<unknown> => {
    return usePostOnBackend('hotels', {
      body: {
        from: '2023-06-12',
        to: '2023-06-12',
        maxDistance: '123',
        lat: '0',
        lon: '0',
      },
    });
  },
});

const dogsCount = ref(0);
const catsCount = ref(0);

const hotels = computed(() => resultOfHotelsQuery?.value?.data ?? []);

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
</script>
