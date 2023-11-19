<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline"> Zwierzaki </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Bone class="mr-2 h-4 w-4" />
              <Label for="width">Psy </Label>
            </div>
            <Input id="width" class="col-span-2 h-8" default-value="0" type="number" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <div class="flex">
              <Cat class="mr-2 h-4 w-4" />
              <Label for="maxWidth"> Koty </Label>
            </div>
            <Input id="maxWidth" class="col-span-2 h-8" default-value="0" type="number" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Cat, Bone } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
</script>
