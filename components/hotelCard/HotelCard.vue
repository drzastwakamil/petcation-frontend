<template>
  <NuxtLink to="/hotels/123">
    <Card class="relative overflow-hidden border-2 hover:border-black">
      <Badge class="absolute left-3 top-3 z-10 px-3 py-2">
        <StarIcon class="mr-2 h-4 w-4" />
        {{ reviewAverage }}
      </Badge>

      <img class="h-60 w-full object-cover" :src="photoUrl" />
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription class="flex gap-1">
          <div class="flex items-center">
            <MapPinIcon class="mr-1 h-3.5 w-3.5" /> <span>{{ location }}</span>
          </div>
          <span> ~ {{ range }} km</span></CardDescription
        >
      </CardHeader>
      <CardContent> {{ description }} </CardContent>
      <CardFooter class="text-sm">
        <span>
          <span>
            <span class="font-medium"> {{ pricePerNight }} zł</span> noc
          </span>
          -
          <span class="font-thin"> {{ priceTotal }} całość </span>
        </span>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import { StarIcon, MapPinIcon } from 'lucide-vue-next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
defineProps<{
  url: string;
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
