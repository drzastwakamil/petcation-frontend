<template>
  <DropdownMenuTrigger class="outline-none" v-bind="props">
    <slot />
  </DropdownMenuTrigger>
</template>

<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from 'radix-vue';

const props = defineProps<DropdownMenuTriggerProps>();
</script>
