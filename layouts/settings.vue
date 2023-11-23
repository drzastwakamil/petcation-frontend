<template>
  <div>
    <div class="md:hidden">
      <VPImage
        alt="Forms"
        class="block"
        height="1214"
        :image="{
          dark: '/examples/forms-dark.png',
          light: '/examples/forms-light.png',
        }"
        width="1280"
      />
    </div>
    <div class="hidden space-y-6 p-10 pb-16 md:block">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
      </div>
      <Separator class="my-6" />
      <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside class="-mx-4 lg:w-1/5">
          <ProfileSidebarNav />
        </aside>
        <div class="flex-1 lg:max-w-2xl">
          <div class="space-y-6">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
</script>
