<template>
  <ComboboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50',
        $attrs.class ?? '',
      )
    "
    :model-value="''"
    :open="true"
  >
    <slot />
  </ComboboxRoot>
</template>

<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue';
import { ComboboxRoot, useForwardPropsEmits } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<ComboboxRootProps>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>
