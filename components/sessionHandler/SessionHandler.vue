<template>
  <div>
    <LoginOrRegister v-if="!userSessionStore.isLoggedIn" />
    <DropdownMenu v-else>
      <DropdownMenuTrigger as-child :disabled="false">
        <Button size="icon" :variant="null">
          <Avatar>
            <AvatarImage alt="avatar" src="" />
            <AvatarFallback>
              <User class="text-slate-300" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
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
              <HotelIcon class="mr-2 h-4 w-4" />
              <span>Rezerwacje</span>
            </DropdownMenuItem>
          </NuxtLink>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          @select="
            () => {
              userSessionStore.logOut();
            }
          "
        >
          <LogOutIcon class="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { WrenchIcon, HotelIcon, LogOutIcon, PawPrintIcon, UserIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const userSessionStore = useUserSessionStore();
</script>
