<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="flex gap-4" variant="outline">
        Zwierzęta
        <div v-if="dogCount > 0 || catCount > 0" class="flex gap-2 border-l-2 pl-4">
          <div v-if="maxDogsCount > 0 && dogCount" class="flex">
            <Bone class="mr-1 h-4 w-4" />
            <Label> {{ dogCount }}</Label>
          </div>
          <div v-if="maxCatsCount && catCount" class="flex">
            <Cat class="mr-1 h-4 w-4" />
            <Label>{{ catCount }}</Label>
          </div>
        </div>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Zwierzęta</h4>
        </div>
        <div class="grid gap-2">
          <div v-if="maxDogsCount" class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Bone class="mr-2 h-4 w-4" />
              <Label for="dogs">Psy</Label>
            </div>
            <Input id="dogs" v-model="localDogCount" class="col-span-2 h-8" type="number" @input="validateDogCount" />
          </div>
          <div v-if="maxCatsCount" class="grid grid-cols-3 items-center gap-4">
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
import { z } from 'zod';
import { Cat, Bone } from 'lucide-vue-next';

const props = defineProps({
  dogCount: {
    type: Number,
    required: false,
  },
  catCount: {
    type: Number,
    required: false,
  },
  maxDogsCount: { type: Number, default: 5 },
  maxCatsCount: { type: Number, default: 5 },
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

const clampValue = (value: number, maxCount: number): number => {
  return Math.max(0, Math.min(value, maxCount));
};

const validateDogCount = () => {
  const rangeSchema = z.number().min(0).max(props.maxDogsCount);

  const result = rangeSchema.safeParse(localDogCount.value);
  if (!result.success) {
    localDogCount.value = clampValue(localDogCount.value, props.maxDogsCount);
  }
};

const validateCatCount = () => {
  const rangeSchema = z.number().min(0).max(props.maxCatsCount);

  const result = rangeSchema.safeParse(localCatCount.value);
  if (!result.success) {
    localCatCount.value = clampValue(localCatCount.value, props.maxCatsCount);
  }
};
</script>
