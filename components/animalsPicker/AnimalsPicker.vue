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
          <div class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Bone class="mr-2 h-4 w-4" />
              <Label for="dogs">Psy</Label>
            </div>
            <Input id="dogs" v-model="dogCountRef" class="col-span-2 h-8" type="number" @input="validateDogCount" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Cat class="mr-2 h-4 w-4" />
              <Label for="cats">Koty</Label>
            </div>
            <Input id="cats" v-model="catCountRef" class="col-span-2 h-8" type="number" @input="validateCatCount" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { Cat, Bone } from 'lucide-vue-next';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const props = defineProps({
  dogCount: {
    type: Number,
    required: true,
  },
  catCount: {
    type: Number,
    required: true,
  },
});

const dogCountRef = ref(props.dogCount);
const catCountRef = ref(props.catCount);

const rangeSchema = z.number().min(0).max(5);

const clampValue = (value: number): number => {
  return Math.max(0, Math.min(value, 5));
};

const validateDogCount = () => {
  const result = rangeSchema.safeParse(dogCountRef.value);
  if (!result.success) {
    dogCountRef.value = clampValue(dogCountRef.value);
  }
};

const validateCatCount = () => {
  const result = rangeSchema.safeParse(catCountRef.value);
  if (!result.success) {
    catCountRef.value = clampValue(catCountRef.value);
  }
};
</script>
