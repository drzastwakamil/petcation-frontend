<template>
  <div>
    <LoginOrRegister v-if="!userSessionStore.isLoggedIn" />
    <DropdownMenu v-else>
      <DropdownMenuTrigger as-child :disabled="false">
        <Button size="icon" :variant="null">
          <Avatar>
            <AvatarImage alt="avatar" :src="''" />
            <AvatarFallback>
              <UserIcon v-if="userSessionStore.role === 'user'" class="text-slate-300" />
              <HotelIcon v-else-if="userSessionStore.role === 'hotel'" class="text-slate-300" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserRoleDropdownContent v-if="userSessionStore.role === 'user'" />
        <HotelRoleDropdownContent v-else-if="userSessionStore.role === 'hotel'" />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          @select="
            () => {
              console.log(useRoute().meta.middleware);
              const middleware = useRoute().meta.middleware;
              userSessionStore.logOut();
              if (middleware === 'auth' || (Array.isArray(middleware) && middleware.includes('auth'))) {
                navigateTo('/');
              }
            }
          "
        >
          <LogOutIcon class="mr-2 h-4 w-4" />
          <span> Wyloguj się </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { LogOutIcon, HotelIcon, UserIcon } from 'lucide-vue-next';
const userSessionStore = useUserSessionStore();
</script>
