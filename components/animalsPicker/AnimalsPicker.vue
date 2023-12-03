<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Zwierzęta</Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Zwierzęta</h4>
        </div>
        <div class="grid gap-2">
          <div v-if="withDogs" class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Bone class="mr-2 h-4 w-4" />
              <Label for="dogs">Psy</Label>
            </div>
            <Input id="dogs" v-model="localDogCount" class="col-span-2 h-8" type="number" @input="validateDogCount" />
          </div>
          <div v-if="withCats" class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Cat class="mr-2 h-4 w-4" />
              <Label for="cats">Koty</Label>
            </div>
            <Input id="cats" v-model="localCatCount" class="col-span-2 h-8" type="number" @input="validateCatCount" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { boolean, z } from 'zod';
import { Cat, Bone } from 'lucide-vue-next';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const props = defineProps({
  dogCount: {
    type: Number,
    required: false, // This makes the property optional
  },
  catCount: {
    type: Number,
    required: false, // This makes the property optional
  },
  withDogs: { type: boolean, default: true },
  withCats: { type: boolean, default: true },
});

const emit = defineEmits(['update:dogCount', 'update:catCount']);

const localDogCount = ref(props.dogCount);
const localCatCount = ref(props.catCount);

watch(localDogCount, (newValue) => {
  emit('update:dogCount', newValue);
});

watch(localCatCount, (newValue) => {
  emit('update:catCount', newValue);
});

// Watch for prop changes to update local refs
watch(
  () => props.dogCount,
  (newVal) => {
    localDogCount.value = newVal;
  },
);

watch(
  () => props.catCount,
  (newVal) => {
    localCatCount.value = newVal;
  },
);

const rangeSchema = z.number().min(0).max(5);

const clampValue = (value: number): number => {
  return Math.max(0, Math.min(value, 5));
};

const validateDogCount = () => {
  const result = rangeSchema.safeParse(localDogCount.value);
  if (!result.success) {
    localDogCount.value = clampValue(localDogCount.value);
  }
};

const validateCatCount = () => {
  const result = rangeSchema.safeParse(localCatCount.value);
  if (!result.success) {
    localCatCount.value = clampValue(localCatCount.value);
  }
};
</script>
