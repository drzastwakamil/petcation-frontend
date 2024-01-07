<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Rezerwacje </Teleport>
      <Teleport to="#description"> Przeglądaj, anuluj, edytuj twoje rezerwacje </Teleport>
    </ClientOnly>
    <div class="bg-white p-4 dark:bg-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> ID</TableHead>
            <TableHead> Użytkownik </TableHead>
            <TableHead> Zwierzę </TableHead>
            <TableHead> Termin </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>12345</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>Buddy</TableCell>
            <TableCell>Apr 1 - Apr 7</TableCell>
            <TableCell>
              <Button class="mr-2 bg-green-500 text-white" variant="default">
                <Check class="h-5 w-5" />
              </Button>
              <Button class="bg-red-500 text-white" variant="default">
                <X class="h-5 w-5" />
              </Button>
            </TableCell>
          </TableRow>
          <!-- More rows can be added here with static placeholder data -->
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, X } from 'lucide-vue-next';
</script>
