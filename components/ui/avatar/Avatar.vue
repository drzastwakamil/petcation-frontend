<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>

<script setup lang="ts">
import { AvatarRoot } from 'radix-vue';
import { avatarVariant } from './utils';
import { cn } from '@/utils/shadcn/utils';

interface Props {
  size?: NonNullable<Parameters<typeof avatarVariant>[0]>['size'];
  shape?: NonNullable<Parameters<typeof avatarVariant>[0]>['shape'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  shape: 'circle',
});
</script>
