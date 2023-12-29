<template>
  <div :class="cn('w-[300px] grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :class="cn('justify-start text-left font-normal', !localDateRange.start && 'text-muted-foreground')"
          :variant="'outline'"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          <span>
            {{
              localDateRange.start
                ? localDateRange.end
                  ? `${format(localDateRange.start, 'LLL dd, y')} - ${format(localDateRange.end, 'LLL dd, y')}`
                  : format(localDateRange.start, 'LLL dd, y')
                : 'Pick a date'
            }}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" :avoid-collisions="true" class="w-auto p-0">
        <Calendar v-model.range="localDateRange" :columns="2" />
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      start: new Date(),
      end: addDays(new Date(), 20),
    }),
  },
});

const emit = defineEmits(['update:modelValue']);

const localDateRange = ref({ ...props.modelValue });

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      localDateRange.value = { ...newValue };
    }
  },
  { deep: true },
);

watch(
  localDateRange,
  (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      emit('update:modelValue', newValue);
    }
  },
  { deep: true },
);
</script>
