<template>
  <DropdownMenuGroup>
    <NuxtLink to="/settings/profile">
      <DropdownMenuItem>
        <UserIcon class="mr-2 h-4 w-4" />
        <span>Profil</span>
      </DropdownMenuItem>
    </NuxtLink>
    <NuxtLink to="/settings/account">
      <DropdownMenuItem>
        <WrenchIcon class="mr-2 h-4 w-4" />
        <span>Konto</span>
      </DropdownMenuItem>
    </NuxtLink>
    <NuxtLink to="/settings/animals">
      <DropdownMenuItem>
        <PawPrintIcon class="mr-2 h-4 w-4" />
        <span>Zwierzaki</span>
      </DropdownMenuItem>
    </NuxtLink>
    <NuxtLink to="/settings/reservations">
      <DropdownMenuItem>
        <CalendarCheckIcon class="mr-2 h-4 w-4" />
        <span>Rezerwacje</span>
      </DropdownMenuItem>
    </NuxtLink>
  </DropdownMenuGroup>
</template>

<script setup lang="ts">
import { WrenchIcon, PawPrintIcon, UserIcon, CalendarCheckIcon } from 'lucide-vue-next';
</script>
