<template>
  <DropdownMenuGroup>
    <NuxtLink to="/hotel/account">
      <DropdownMenuItem>
        <UserIcon class="mr-2 h-4 w-4" />
        <span>Konto</span>
      </DropdownMenuItem>
    </NuxtLink>
    <NuxtLink to="/hotel/reservations">
      <DropdownMenuItem>
        <CalendarCheckIcon class="mr-2 h-4 w-4" />
        <span>Rezerwacje</span>
      </DropdownMenuItem>
    </NuxtLink>
  </DropdownMenuGroup>
</template>

<script setup lang="ts">
import { CalendarCheckIcon, UserIcon } from 'lucide-vue-next';
</script>
