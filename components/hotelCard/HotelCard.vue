<template>
  <NuxtLink to="/hotels/123">
    <Card class="overflow-hidden">
      <img class="h-60 w-full" src="/images/mock_hotel.webp" />
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent> Card Content </CardContent>
      <CardFooter> Card Footer </CardFooter>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
</script>
