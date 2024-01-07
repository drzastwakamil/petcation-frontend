<template>
  <NuxtLink :to="link">
    <Card class="flex h-full flex-col justify-between overflow-hidden border-2 hover:border-black">
      <div>
        <div class="relative flex h-60 w-full items-center justify-center bg-zinc-100">
          <Badge v-if="reviewAverage" class="absolute left-3 top-3 z-10 px-3 py-2">
            <StarIcon class="mr-2 h-4 w-4" fill="white" />
            {{ reviewAverage }}
          </Badge>
          <img v-if="photoUrl?.length" class="h-full w-full object-cover" :src="photoUrl" />
          <div v-else>
            <PawPrintIcon class="h-[80px] w-[80px] text-zinc-300" />
          </div>
        </div>
        <CardHeader>
          <CardTitle>{{ title }}</CardTitle>
          <CardDescription class="flex gap-1">
            <div class="flex items-center">
              <MapPinIcon class="mr-2 h-3.5 w-3.5" /> <span>{{ location }}</span>
            </div>
            <!-- <span> ~ {{ range }} km</span> -->
          </CardDescription>
        </CardHeader>
        <CardContent> {{ description }} </CardContent>
      </div>
      <!-- <CardFooter class="text-sm">
        <span>
          <span>
            <span class="font-medium"> {{ pricePerNight }}zł</span> noc
          </span>
          -
          <span class="font-thin"> {{ priceTotal }}zł całość </span>
        </span>
      </CardFooter> -->
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import { MapPinIcon, PawPrintIcon, StarIcon } from 'lucide-vue-next';

defineProps<{
  link: unknown;
  photoUrl: string;
  title: string;
  location: string;
  description: string;
  reviewAverage: number;
  range: number;
  pricePerNight: number;
  priceTotal: number;
}>();
</script>
