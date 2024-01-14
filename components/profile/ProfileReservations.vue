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
            <TableHead>Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(reservation, index) in reservations" :key="index">
            <TableCell
              :class="{
                'opacity-50': reservationIsInThePast(reservation),
              }"
            >
              <NuxtLink class="underline" :to="`/hotels/${reservation?.hotelDto?.id}`">
                {{ reservation?.hotelDto?.name }}</NuxtLink
              >
            </TableCell>
            <TableCell
              :class="{
                'opacity-50': reservationIsInThePast(reservation),
              }"
            >
              {{ reservation?.hotelDto?.addressDto?.street }}, {{ reservation?.hotelDto?.addressDto?.city }}
            </TableCell>
            <TableCell
              class="flex gap-4"
              :class="{
                'opacity-50': reservationIsInThePast(reservation),
              }"
            >
              <AnimalsDialog :reservation="reservation" />
            </TableCell>
            <TableCell
              :class="{
                'opacity-50': reservationIsInThePast(reservation),
              }"
            >
              {{ reservation?.from }} - {{ reservation?.to }}</TableCell
            >
            <TableCell
              :class="{
                'opacity-50': reservationIsInThePast(reservation),

                'text-red-500':
                  reservation?.status === ReservationStatus.REJECTED ||
                  reservation?.status === ReservationStatus.DELETED,
                'text-green-500': reservation?.status === ReservationStatus.ACCEPTED,
              }"
            >
              {{
                reservationIsInThePast(reservation) && reservation?.status === ReservationStatus.ACCEPTED
                  ? 'Zakończona'
                  : getReservationStatusTitle(reservation?.status as ReservationStatus)
              }}
            </TableCell>
            <TableCell class="flex">
              <ProfileReservationsActionsDropdown
                :adding-hotel-rate-is-loading="addingHotelRateIsLoading"
                :execute-add-hotel-rate="executeAddHotelRate"
                :execute-reject-reservation="
                  () => {
                    executeDeleteReservation({
                      id: reservation?.id,
                    });
                  }
                "
                :index="index"
                :is-in-the-past="reservationIsInThePast(reservation)"
                :rejecting-is-loading="deletingReservationIsLoading"
                :reservation="reservation"
                :status="reservation?.status"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BoneIcon, CatIcon, StarIcon } from 'lucide-vue-next';
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
    return useGetFromBackend('allReservations', undefined, 'WITH_AUTHORIZATION');
  },
});

const reservations = computed(() => {
  const array = resultOfReservationsQuery.value?.data?.length ? [...resultOfReservationsQuery.value?.data] : [];
  array.reverse();
  return array;
});
const isDialogOpen = ref(false);

const { mutate: executeDeleteReservation, isPending: deletingReservationIsLoading } = useMutation({
  mutationFn: (variables): Promise<unknown> => {
    return useDeleteFromBackend(
      'deleteReservation',
      {
        params: {
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

const { mutate: executeAddHotelRate, isPending: addingHotelRateIsLoading } = useMutation({
  mutationFn: (variables): Promise<unknown> => {
    return usePostOnBackend(
      'addHotelRate',
      {
        body: {
          hotelId: variables?.hotelId || 0,
          reservationId: variables?.reservationId || 0,
          rate: variables?.rate || 0,
          comment: variables?.comment || '',
        },
      },
      'WITH_AUTHORIZATION',
    );
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się dodać oceny!',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    refetch();
    isDialogOpen.value = false;
    toast({
      title: 'Udało się dodać ocenę!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się dodać oceny!',
      description: error.message,
      variant: 'destructive',
    });
  },
});

function reservationIsInThePast(reservation) {
  // Get today's date and reset the time to midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse the 'to' date from the deadline object
  const toDate = new Date(reservation.to);

  // Check if the 'to' date is before today
  return toDate < today;
}
</script>
