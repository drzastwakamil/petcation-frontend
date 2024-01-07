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
            <TableHead> Adres </TableHead>
            <TableHead> Zwierzęta </TableHead>
            <TableHead> Termin </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Anuluj rezerwację</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(reservation, index) in reservations" :key="index">
            <TableCell>
              <NuxtLink class="underline" :to="`/hotels/${reservation?.hotelDto?.id}`">
                {{ reservation?.hotelDto?.name }}</NuxtLink
              >
            </TableCell>
            <TableCell>
              {{ reservation?.hotelDto?.addressDto?.street }},{{ reservation?.hotelDto?.addressDto?.city }}
            </TableCell>
            <TableCell class="flex gap-4">
              <div v-for="pet in reservation?.petDtos || []" :key="pet.id">
                <BoneIcon v-if="pet.petType === 'DOG'" class="inline-flex" />
                <CatIcon v-else-if="pet.petType === 'CAT'" class="inline-flex" />
                {{ pet.name }}
              </div>
            </TableCell>
            <TableCell> {{ reservation?.from }} - {{ reservation?.to }}</TableCell>
            <TableCell> {{ getReservationStatusTitle(reservation?.status as ReservationStatus) }}</TableCell>
            <TableCell>
              <AlertDialog
                :key="reservation?.id || index"
                :open="isDialogOpen"
                @update:open="
                  (open) => {
                    isDialogOpen = open;
                  }
                "
              >
                <div class="flex justify-between p-5" rounded>
                  <AlertDialogTrigger as-child>
                    <div>
                      <Button size="icon" variant="ghost">
                        <DeleteIcon />
                      </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div>
                      <AlertDialogDescription>
                        Czy jesteś pewien że chcesz anulować rezerwację? Nie będziesz mógł cofnąć tej operacji!
                      </AlertDialogDescription>
                      <div class="grid grid-cols-4 gap-4 pt-12">
                        <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>
                        <Button
                          class="col-span-3"
                          :disabled="false"
                          :onclick="
                            () => {
                              executeDeleteReservation({
                                id: reservation?.id,
                              });
                            }
                          "
                          variant="destructive"
                        >
                          Anuluj rezerwację
                          <Loader2 v-if="deletingReservationIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                        </Button>
                      </div>
                    </div>
                  </AlertDialogContent>
                </div>
              </AlertDialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BoneIcon, CatIcon, DeleteIcon } from 'lucide-vue-next';
import { useQuery, useMutation } from '@tanstack/vue-query';
import { toast } from '../ui/commonToast';
import { getReservationStatusTitle, ReservationStatus } from '@/types/common';

const {
  data: resultOfReservationsQuery,
  isPending: reservationsQueryIsLoading,
  refetch,
} = useQuery({
  queryKey: ['user'],
  queryFn: (): Promise<unknown> => {
    return useGetFromBackend('/allReservations', undefined, 'WITH_AUTHORIZATION');
  },
});

const reservations = computed(() => {
  return resultOfReservationsQuery.value?.data || [];
});
const isDialogOpen = ref(false);

const { mutate: executeDeleteReservation, isPending: deletingReservationIsLoading } = useMutation({
  mutationFn: (variables): Promise<unknown> => {
    return useDeleteFromBackend(
      'deleteReservation',
      {
        body: {
          id: variables.id,
        },
      },
      'WITH_AUTHORIZATION',
    );
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się anulować rezerwacji!',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    refetch();
    isDialogOpen.value = false;
    toast({
      title: 'Udało się anulować rezerwację!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się anulować rezerwacji!',
      description: error.message,
      variant: 'destructive',
    });
  },
});
</script>
