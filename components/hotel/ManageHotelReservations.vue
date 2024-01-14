<template>
  <div>
    <ClientOnly>
      <Teleport to="#title"> Rezerwacje </Teleport>
      <Teleport to="#description"> Zarządzaj rezerwacjami swojego Hotelu </Teleport>
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
            <TableHead> Akcje</TableHead>
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
              {{ reservation?.from }} - {{ reservation?.to }}
            </TableCell>
            <TableCell
              :class="{
                'opacity-50': reservationIsInThePast(reservation),

                'text-red-500': reservation?.status === ReservationStatus.REJECTED,
                'text-green-500': reservation?.status === ReservationStatus.ACCEPTED,
              }"
            >
              {{
                reservationIsInThePast(reservation) && reservation?.status === ReservationStatus.ACCEPTED
                  ? 'Zakończona'
                  : getReservationStatusTitle(reservation?.status as ReservationStatus)
              }}</TableCell
            >
            <TableCell class="flex">
              <HotelReservationActionsDropdown
                v-if="reservation.status !== ReservationStatus.REJECTED"
                :accepting-is-loading="acceptingReservationIsLoading"
                :execute-accept-reservation="
                  () => {
                    executeAcceptReservation({
                      id: reservation?.id,
                    });
                  }
                "
                :execute-invite-for-trial-stay="
                  () => {
                    console.log('inviting executing ');
                    executeInviteForTrialStay(reservation);
                  }
                "
                :execute-reject-reservation="
                  () => {
                    executeDeleteReservation({
                      id: reservation?.id,
                    });
                  }
                "
                :inviting-is-loading="invitingForTrialStayIsLoading"
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

watch(resultOfReservationsQuery, () => {
  console.log('the fetched data', resultOfReservationsQuery.value);
});

const reservations = computed(() => {
  const array = resultOfReservationsQuery.value?.data?.length ? [...resultOfReservationsQuery.value?.data] : [];
  array.reverse();
  return array;
});

const { mutate: executeDeleteReservation, isPending: deletingReservationIsLoading } = useMutation({
  mutationFn: (variables): Promise<unknown> => {
    return useDeleteFromBackend(
      'rejectReservation',
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

const { mutate: executeAcceptReservation, isPending: acceptingReservationIsLoading } = useMutation({
  mutationFn: (variables): Promise<unknown> => {
    return usePostOnBackend(
      'acceptReservation',
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
        title: 'Nie udało się zaakceptować rezerwacji!',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    refetch();
    toast({
      title: 'Udało się zaakceptować rezerwację!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się zaakceptować rezerwacji!',
      description: error.message,
      variant: 'destructive',
    });
  },
});

const { mutate: executeInviteForTrialStay, isPending: invitingForTrialStayIsLoading } = useMutation({
  mutationFn: (reservation): Promise<unknown> => {
    const owner = reservation.petDtos.at(0)?.petDto?.petOwnerDto ?? null;
    return useFetch('/api/sendInviteForTrialStay', {
      body: {
        reservation,
        owner,
      },
      method: 'POST',
    });
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się wysłać zaproszenia.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Udało się wysłać zaproszenie!.',
      description: 'Poinformowaliśmy użytkownika aby się z tobą skontaktował!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się wysłać zaproszenia.',
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
