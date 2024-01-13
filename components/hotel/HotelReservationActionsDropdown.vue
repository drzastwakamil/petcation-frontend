<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="flex h-8 w-8 p-0 data-[state=open]:bg-muted" variant="ghost">
          <MoreHorizontalIcon class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          v-if="status === ReservationStatus.PENDING"
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
          v-if="status === ReservationStatus.PENDING || status === ReservationStatus.ACCEPTED"
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
      </DropdownMenuContent>
    </DropdownMenu>

    <Teleport to="body">
      <AlertDialog
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
                      // executeDeleteReservation({
                      //   id: reservation?.id,
                      // });
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
                      // executeDeleteReservation({
                      //   id: reservation?.id,
                      // });
                    }
                  "
                  variant="destructive"
                >
                  Odrzuć rezerwację
                  <!-- <Loader2 v-if="deletingReservationIsLoading" class="ml-2 h-4 w-4 animate-spin" /> -->
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
                Czy jesteś pewien że chcesz anulować rezerwację? Nie będziesz mógł cofnąć tej operacji!
              </AlertDialogDescription>
              <div class="grid grid-cols-4 gap-4 pt-12">
                <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>
                <Button
                  class="col-span-3"
                  :disabled="false"
                  :onclick="
                    () => {
                      // executeDeleteReservation({
                      //   id: reservation?.id,
                      // });
                    }
                  "
                  variant="destructive"
                >
                  Odrzuć rezerwację
                  <!-- <Loader2 v-if="deletingReservationIsLoading" class="ml-2 h-4 w-4 animate-spin" /> -->
                </Button>
              </div>
            </div>
          </AlertDialogContent>
        </div>
      </AlertDialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { MoreHorizontalIcon, Loader2 } from 'lucide-vue-next';
import { ReservationStatus } from '@/types/common';

const props = defineProps<{
  status: ReservationStatus;
  executeAcceptReservation: () => void;
  acceptingIsLoading: boolean;
  executeRejectReservation: () => void;
  rejectingIsLoading: boolean;
  executeInviteForTrialStay: () => void;
  invitingIsLoading: boolean;
}>();
console.log('the status', props.status);
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
};

const rejectDialogOpen = ref(false);
const acceptDialogOpen = ref(false);
const inviteDialogOpen = ref(false);
</script>
