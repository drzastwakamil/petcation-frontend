<template>
  <div :class="cn('grid gap-2', $attrs.class ?? '')">
    <Popover>
      <PopoverTrigger as-child>
        <Button
          id="date"
          :class="cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')"
          :variant="'outline'"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />

          <span>
            {{
              date.start
                ? date.end
                  ? `${format(date.start, 'LLL dd, y')} - ${format(date.end, 'LLL dd, y')}`
                  : format(date.start, 'LLL dd, y')
                : 'Pick a date'
            }}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" :avoid-collisions="true" class="w-auto p-0">
        <Calendar v-model.range="date" :columns="2" />
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-vue-next';

import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const today = new Date();
const date = ref({
  start: today,
  end: addDays(Date.now(), 20),
});
</script>
