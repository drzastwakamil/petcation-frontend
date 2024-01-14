<template>
  <div v-if="canRate || canAccept || canReject || status === ReservationStatus.PENDING">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="flex h-8 w-8 p-0 data-[state=open]:bg-muted" variant="ghost">
          <MoreHorizontalIcon class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          v-if="canAccept"
          :value="labels.accept.value"
          @select="
            () => {
              acceptDialogOpen = true;
            }
          "
        >
          {{ labels.accept.label }}
        </DropdownMenuItem>
        <DropdownMenuItem
          v-if="canReject"
          :value="labels.reject.value"
          @select="
            () => {
              rejectDialogOpen = true;
            }
          "
        >
          {{ labels.reject.label }}
        </DropdownMenuItem>
        <DropdownMenuItem
          v-if="status === ReservationStatus.PENDING"
          :value="labels.invite_for_trial.value"
          @select="
            () => {
              inviteDialogOpen = true;
            }
          "
        >
          {{ labels.invite_for_trial.label }}
        </DropdownMenuItem>
        <div v-if="canRate">
          <DropdownMenuItem
            v-for="petToRateCandidate in petsToRate"
            :key="petToRateCandidate?.petDto?.id"
            :value="labels.rate.value"
            @select="
              () => {
                petToRate = petToRateCandidate;
              }
            "
          >
            {{ console.log('pet trc', petToRateCandidate) }}
            {{ labels.rate.label }} {{ petToRateCandidate?.petDto.name }}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>

    <Teleport to="body">
      <AlertDialog
        v-if="canAccept"
        :open="acceptDialogOpen"
        @update:open="
          (open) => {
            acceptDialogOpen = open;
          }
        "
      >
        <div class="flex justify-between p-5" rounded>
          <AlertDialogContent>
            <div>
              <AlertDialogDescription> Czy jesteś pewien że chcesz zaakceptować rezerwację? </AlertDialogDescription>
              <div class="grid grid-cols-4 gap-4 pt-12">
                <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>
                <Button
                  class="col-span-3"
                  :disabled="acceptingIsLoading"
                  :onclick="
                    () => {
                      executeAcceptReservation();
                    }
                  "
                >
                  Akceptuje rezerwację
                  <Loader2 v-if="acceptingIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>
      <AlertDialog
        v-if="canReject"
        :open="rejectDialogOpen"
        @update:open="
          (open) => {
            rejectDialogOpen = open;
          }
        "
      >
        <div class="flex justify-between p-5" rounded>
          <AlertDialogContent>
            <div>
              <AlertDialogDescription>
                Czy jesteś pewien że chcesz odrzucić rezerwację? Nie będziesz mógł cofnąć tej operacji!
              </AlertDialogDescription>
              <div class="grid grid-cols-4 gap-4 pt-12">
                <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>
                <Button
                  class="col-span-3"
                  :disabled="false"
                  :onclick="
                    () => {
                      executeRejectReservation();
                    }
                  "
                  variant="destructive"
                >
                  Odrzuć rezerwację
                  <Loader2 v-if="rejectingIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>

      <AlertDialog
        :open="inviteDialogOpen"
        @update:open="
          (open) => {
            inviteDialogOpen = open;
          }
        "
      >
        <div class="flex justify-between p-5" rounded>
          <AlertDialogContent>
            <div>
              <AlertDialogDescription>
                Czy jesteś pewien że zaprosić użytkownika na próbny pobyt? Wyślemy mu informację z twoimi danymi oraz
                poleceniem skontaktowania się z tobą!
              </AlertDialogDescription>
              <div class="grid grid-cols-4 gap-4 pt-12">
                <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>
                <Button
                  class="col-span-3"
                  :disabled="false"
                  :onclick="
                    () => {
                      executeInviteForTrialStay();
                    }
                  "
                >
                  Zaproś na próbny pobyt
                  <Loader2 v-if="invitingIsLoading" class="ml-2 h-4 w-4 animate-spin" />
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>

      <AlertDialog
        v-if="canRate"
        :open="rateDialogOpen"
        @update:open="
          (open) => {
            petToRateCandidate = null;
          }
        "
      >
        <div class="flex justify-between p-5" rounded>
          <AlertDialogContent>
            <div>
              <AlertDialogDescription>
                <h1 class="py-3 text-lg text-black">Wystaw ocenę:</h1>

                <Select
                  :model-value="value"
                  @update:model-value="
                    (value) => {
                      selectedRate = value;
                    }
                  "
                >
                  <SelectTrigger :id="`catsPicker${index}`">
                    <SelectValue placeholder="Wybierz ocenę" />
                    <div class="flex items-center gap-2 border-l-2 pl-4">
                      <div v-if="petToRate?.petDto?.petType === 'DOG'" class="flex items-center">
                        <Bone class="mr-1 h-4 w-4" />
                        <Label> {{ petToRate?.petDto?.name }}</Label>
                      </div>
                      <div v-else-if="petToRate?.petDto?.petType === 'CAT'" class="flex items-center">
                        <Cat class="mr-1 h-4 w-4" />
                        <Label>{{ petToRate?.petDto?.name }}</Label>
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem
                      v-for="starsAmount in [1, 2, 3, 4, 5]"
                      :key="starsAmount"
                      class="flex"
                      :value="starsAmount"
                    >
                      <StarIcon v-for="index in starsAmount" :key="index" class="inline-flex" />
                    </SelectItem>
                  </SelectContent>
                </Select>

                <form @submit="onSendJoinRequestSubmit">
                  <div class="space-y-3 pt-5">
                    <FormField v-slot="{ componentField }" name="comment">
                      <FormItem>
                        <FormControl>
                          <Textarea class="mb-4" placeholder="Komentarz do oceny" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <div class="grid grid-cols-4 gap-4 pt-12">
                      <Button
                        class="col-span-1"
                        :onclick="
                          () => {
                            petToRate = null;
                          }
                        "
                        variant="outline"
                      >
                        Cofnij
                      </Button>

                      <Button
                        class="col-span-3"
                        :disabled="sendButtonDisabled"
                        :onclick="
                          () => {
                            invokeExecuteAddRate();
                          }
                        "
                      >
                        Wystaw ocene
                        <Loader2 v-if="addingRateLoading" class="ml-2 h-4 w-4 animate-spin" />
                      </Button>
                    </div>
                  </div>
                </form>
              </AlertDialogDescription>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { MoreHorizontalIcon, Loader2, StarIcon, Bone, Cat } from 'lucide-vue-next';
import { ReservationStatus } from '@/types/common';
import { useMutation } from '@tanstack/vue-query';

import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField } from '@/components/ui/form';

const props = defineProps<{
  isInThePast: boolean;
  reservation: any;
  status: ReservationStatus;
  executeAcceptReservation: () => void;
  acceptingIsLoading: boolean;
  executeRejectReservation: () => void;
  rejectingIsLoading: boolean;
  executeInviteForTrialStay: () => void;
  invitingIsLoading: boolean;
}>();
const labels = {
  reject: {
    label: 'Odrzuć',
    value: 'reject',
  },
  accept: {
    label: 'Akceptuj',
    value: 'accept',
  },
  invite_for_trial: {
    label: 'Zaproś na próbny pobyt',
    value: 'invite_for_trial',
  },
  rate: {
    label: 'Oceń',
    value: 'rate',
  },
};

const rejectDialogOpen = ref(false);
const acceptDialogOpen = ref(false);
const inviteDialogOpen = ref(false);

const canReject = computed(() => {
  if (props.isInThePast) {
    return false;
  }
  if (props.status === ReservationStatus.DELETED) {
    return false;
  }
  return props.status === ReservationStatus.PENDING || props.status === ReservationStatus.ACCEPTED;
});

const canAccept = computed(() => {
  return props.status === ReservationStatus.PENDING;
});

const { mutate: executeAddRate, isPending: addingRateLoading } = useMutation({
  mutationFn: (variables): Promise<unknown> => {
    return usePostOnBackend(
      'addRate',
      {
        body: {
          petId: variables?.petId || 0,
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

const petsToRate = computed(() => {
  return props?.reservation?.petDtos?.filter((petData) => {
    console.log('wrr', petData?.petDto.isAnyRateForPet);
    return petData?.petDto.isAnyRateForPet !== false;
  });
});

const canRate = computed(() => {
  return props.isInThePast && props.reservation.status === ReservationStatus.ACCEPTED;
});

const petToRate = ref(null);
const rateDialogOpen = computed(() => {
  return petToRate.value !== null;
});

const selectedRate = ref<number | null>(null);

const sendingRateSchema = toTypedSchema(
  z.object({
    comment: z
      .string({
        required_error: 'Komentarz jest wymagany',
        invalid_type_error: 'Komentarz musi być tekstem',
      })
      .min(10, 'Komentarz musi posiadać minimum 10 znaków ')
      .max(350, 'Komentarz może posiadać maximum 350 znaków '),
  }),
);
const form = useForm({
  validationSchema: sendingRateSchema,
});
const onSendJoinRequestSubmit = form.handleSubmit(() => {});

const invokeExecuteAddRate = () => {
  const petId = petToRate?.value.petDto.id;
  const reservationId = props?.reservation?.id;
  const rate = selectedRate.value;
  const comment = form?.values.comment || '';
  debugger;
  executeAddRate({
    petId,
    reservationId,
    rate,
    comment,
  });
};
const sendButtonDisabled = computed(() => {
  return (
    props.addingRateLoading || form.errors.value.comment?.length || !selectedRate.value || !form.values.comment?.length
  );
});
</script>
