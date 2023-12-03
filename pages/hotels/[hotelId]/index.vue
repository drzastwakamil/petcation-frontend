<template>
  <div class="container mx-auto">
    <div class="h-header" />

    <div class="grid grid-cols-7 gap-4 py-10">
      <div class="col-span-5 space-y-8">
        <ImagesCarousel
          :images-urls="[
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
            `${Date.now() + Math.random()}`,
          ]"
        />
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
              <div class="flex"><DogIcon class="mr-1 h-5 w-5" /> Pies - 110zł noc</div>
              <div class="flex"><CatIcon class="mr-1 h-5 w-5" /> Kot - 50zł noc</div>
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-3">
            <DatePicker class="w-full" />
            <div>
              <AnimalsPicker />
            </div>
            <Separator />
          </CardContent>

          <CardFooter class="space-y-5">
            <div class="flex flex-row justify-between">
              <div class="font-semibold">Razem</div>
              <div>600zł</div>
            </div>
            <Button class="w-full" size="lg"> Kontynnuuj</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DogIcon, CatIcon } from 'lucide-vue-next';
import { useRouteParams } from '@vueuse/router';
import { useQuery } from '@tanstack/vue-query';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
const hotelId = useRouteParams('hotelId');

const {
  data: resultOfHotelQuery,
  isPending: hotelQueryIsLoading,
  refetch,
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
</script>
