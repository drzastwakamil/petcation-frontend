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
            <TableCell>
              <NuxtLink class="underline" :to="`/hotels/${reservation?.hotelDto?.id}`">
                {{ reservation?.hotelDto?.name }}</NuxtLink
              >
            </TableCell>
            <TableCell>
              {{ reservation?.hotelDto?.addressDto?.street }}, {{ reservation?.hotelDto?.addressDto?.city }}
            </TableCell>
            <TableCell class="flex gap-4">
              <div v-for="pet in reservation?.petDtos || []" :key="pet.id">
                <BoneIcon v-if="pet.petType === 'DOG'" class="inline-flex" />
                <CatIcon v-else-if="pet.petType === 'CAT'" class="inline-flex" />
                {{ pet.name }}
              </div>
            </TableCell>
            <TableCell> {{ reservation?.from }} - {{ reservation?.to }}</TableCell>
            <TableCell
              :class="{
                'text-red-500': reservation?.status === ReservationStatus.REJECTED,
                'text-green-500': reservation?.status === ReservationStatus.ACCEPTED,
              }"
            >
              {{ getReservationStatusTitle(reservation?.status as ReservationStatus) }}</TableCell
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
                :execute-invite-for-trial-stay="() => {}"
                :execute-reject-reservation="() => {}"
                :inviting-is-loading="false"
                :rejecting-is-loading="false"
                :status="reservation?.status"
              />
              <!-- <AlertDialog
                v-if="
                  reservation?.status === ReservationStatus.PENDING ||
                  reservation?.status === ReservationStatus.ACCEPTED
                "
                :key="reservation?.id || index"
                :open="rejectDialogOpen"
                @update:open="
                  (open) => {
                    rejectDialogOpen = open;
                  }
                "
              >
                <div class="flex justify-between p-5" rounded>
                  <AlertDialogTrigger as-child>
                    <div>
                      <Button variant="destructive"> Odrzuć </Button>
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
                          Odrzuć rezerwację
                          <Loader2 v-if="deletingReservationIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                        </Button>
                      </div>
                    </div>
                  </AlertDialogContent>
                </div>
              </AlertDialog>
              <AlertDialog
                v-if="reservation?.status === ReservationStatus.PENDING"
                :key="reservation?.id || index"
                :open="acceptDialogOpen"
                @update:open="
                  (open) => {
                    acceptDialogOpen = open;
                  }
                "
              >
                <div class="flex justify-between p-5" rounded>
                  <AlertDialogTrigger as-child>
                    <div>
                      <Button class="bg-green-500"> Akceptuj </Button>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div>
                      <AlertDialogDescription>
                        Czy jesteś pewien że zaakceptować rezerwację? Nie będziesz mógł cofnąć tej operacji!
                      </AlertDialogDescription>
                      <div class="grid grid-cols-4 gap-4 pt-12">
                        <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>
                        <Button
                          class="col-span-3"
                          :disabled="false"
                          :onclick="
                            () => {
                              executeAcceptReservation({
                                id: reservation?.id,
                              });
                            }
                          "
                        >
                          Akceptuj rezerwację
                          <Loader2 v-if="acceptingReservationIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                        </Button>
                      </div>
                    </div>
                  </AlertDialogContent>
                </div>
              </AlertDialog>
              <Button
                v-if="reservation?.status === ReservationStatus.PENDING"
                :onclick="
                  () => {
                    executeInviteForTrialStay({
                      email: reservation.petDtos[0].petOwnerDto.email,
                      hotelDto: reservation.hotelDto,
                    });
                  }
                "
              >
                Zaproś na próbny pobyt
              </Button> -->
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
    isDialogOpen.value = false;
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

const { mutate: executeInviteForTrialStay, isPending } = useMutation({
  mutationFn: ({ hotelDto, email }): Promise<unknown> => {
    return useFetch('/api/sendInviteForTrialStay', {
      body: {
        hotelDto,
        to: email,
      },
      method: 'POST',
    });
  },
  onSuccess: ({ error }) => {
    if (error._object[error?._key]?.message.length) {
      toast({
        title: 'Nie udało się wysłać formularza.',
        description: error._object[error._key]?.message,
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Udało się wysłać formularz!.',
      description: 'Skontaktujemy się z tobą jak najszybciej!',
    });
  },
  onError: (error) => {
    toast({
      title: 'Nie udało się wysłać formularza.',
      description: error.message,
      variant: 'destructive',
    });
  },
});
</script>
