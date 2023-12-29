<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button :aria-expanded="open" class="w-[200px] justify-between" role="combobox" variant="outline">
        <div class="flex">
          <MapPin class="mr-2 h-4 w-4" />
          {{ value ? value.label : 'Lokalizacja' }}
        </div>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command :filter-function="filterFunction">
        <CommandInput placeholder="Wyszukaj" />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework"
            @select="
              (ev) => {
                value = ev.detail.value as typeof framework;
                open = false;
              }
            "
          >
            <Check :class="cn('mr-2 h-4 w-4', value?.value === framework.value ? 'opacity-100' : 'opacity-0')" />
            {{ framework.label }}
          </CommandItem>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Check, ChevronsUpDown, MapPin } from 'lucide-vue-next';

const frameworks = [
  { value: 'next.js', label: 'Poznań' },
  { value: 'sveltekit', label: 'Szczecin' },
  { value: 'nuxt.js', label: 'Warszawa' },
  { value: 'remix', label: 'Międzyzdroje' },
  { value: 'astro', label: 'Opole' },
];

const open = ref(false);
const value = ref<(typeof frameworks)[number]>();

const filterFunction = (list: typeof frameworks, search: string) =>
  list.filter((i) => i.value.toLowerCase().includes(search.toLowerCase()));
</script>
