<template>
  <component :is="as" :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { buttonVariants } from '.';

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size'];
  as?: string;
}

withDefaults(defineProps<Props>(), {
  as: 'button',
});
</script>
.