<template>
  <div class="flex min-h-screen flex-col">
    <div class="absolute w-full border-b">
      <div class="container mx-auto">
        <div class="flex h-20 w-full py-4">
          <div class="z-10">
            <NuxtImg class="h-full" src="/images/logo5.svg" />
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>
