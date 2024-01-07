<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Rezerwacje </Teleport>
      <Teleport to="#description"> Przeglądaj, anuluj twoje rezerwacje </Teleport>
    </ClientOnly>
    <div class="bg-white p-4 dark:bg-black">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Hotel </TableHead>
            <TableHead> Zwierzęta </TableHead>
            <TableHead> Termin </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(reservation, index) in reservations" :key="index">
            {{ console.log('the res', reservation) }}
            <TableCell> tutaj nazwa hotelu</TableCell>
            <TableCell class="flex gap-4">
              <div v-for="pet in reservation.petDtos" :key="pet.id">
                <BoneIcon v-if="pet.petType === 'DOG'" class="inline-flex" />
                <CatIcon v-else-if="pet.petType === 'CAT'" class="inline-flex" />

                {{ pet.name }}
              </div>
            </TableCell>
            <TableCell> {{ reservation.from }} - {{ reservation.to }}</TableCell>
            <TableCell> {{ reservation.status }}</TableCell>
            <TableCell>
              <AlertDialog :key="reservation.id">
                <div class="flex justify-between border p-5" rounded>
                  <AlertDialogTrigger as-child>
                    <Button size="icon" variant="ghost">
                      <DeleteIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div>
                      Czy jesteś pewien że chcesz anulować rezerwację?
                      <!-- <span class="font-bold">{{ pet.name }}</span>
                      ze swojej listy zwierząt? -->
                      <div class="grid grid-cols-4 gap-4 pt-12">
                        <div class="col-span-1" />
                        <Button class="col-span-3" :disabled="false" :onclick="() => {}" variant="destructive">
                          Anuluj rezerwację
                          <Loader2 v-if="false" class="ml-2 h-4 w-4 animate-spin" />
                        </Button>
                      </div>
                    </div>
                  </AlertDialogContent>
                </div>
              </AlertDialog>
            </TableCell>
          </TableRow>
          <!-- More rows can be added here with static placeholder data -->
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, X, BoneIcon, CatIcon, DeleteIcon } from 'lucide-vue-next';
import { useQuery } from '@tanstack/vue-query';

const { data: resultOfReservationsQuery, isPending: reservationsQueryIsLoading } = useQuery({
  queryKey: ['user'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('/allReservations', undefined, 'WITH_AUTHORIZATION');
  },
});

const reservations = computed(() => {
  return resultOfReservationsQuery.value?.data || [];
});
</script>
