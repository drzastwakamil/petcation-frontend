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
        <Calendar v-model.range="localDateRange" :columns="2" :disabled-dates="disabledDates" :min-date="new Date()" />
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
  disabledDates: {
    type: Array<Date>,
    default: [],
  },
});

const emit = defineEmits(['update:modelValue']);
const localDateRange = ref({ ...props.modelValue });

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      const val = { ...newValue };
      const date1 = val.start;
      const date2 = val.end;

      const day1 = date1.getDate();
      const month1 = date1.getMonth();
      const year1 = date1.getFullYear();

      const day2 = date2.getDate();
      const month2 = date2.getMonth();
      const year2 = date2.getFullYear();
      if (day1 === day2 && month1 === month2 && year1 === year2) {
        val.end.setDate(val.end.getDate() + 1);
      }
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
