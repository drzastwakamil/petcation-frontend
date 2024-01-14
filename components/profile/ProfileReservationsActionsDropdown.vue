<template>
  <div v-if="canReject || canRate" class="text-black">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="flex h-8 w-8 p-0" variant="ghost">
          <MoreHorizontalIcon class="h-4 w-4" />
          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          v-if="canReject"
          :value="labels.cancel.value"
          @select="
            () => {
              rejectDialogOpen = true;
            }
          "
        >
          {{ labels.cancel.label }}
        </DropdownMenuItem>

        <DropdownMenuItem
          v-if="canRate"
          :value="labels.rate.value"
          @select="
            () => {
              rateDialogOpen = true;
            }
          "
        >
          {{ labels.rate.label }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Teleport to="body">
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
                Czy jesteś pewien że chcesz anulować rezerwację? Nie będziesz mógł cofnąć tej operacji!
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
                  Anuluj rezerwację
                  <Loader2 v-if="rejectingIsLoading" class="ml-2 h-4 w-4 animate-spin" />
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
            rateDialogOpen = open;
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
                      <AlertDialogCancel class="col-span-1"> Cofnij </AlertDialogCancel>

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
                        <Loader2 v-if="addingHotelRateIsLoading" class="ml-2 h-4 w-4 animate-spin" />
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
import { MoreHorizontalIcon, Loader2, StarIcon } from 'lucide-vue-next';
import { ReservationStatus } from '@/types/common';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { FormField } from '@/components/ui/form';

const props = defineProps<{
  isInThePast: boolean;
  index: number;
  reservation: any;
  status: ReservationStatus;
  executeRejectReservation: () => void;
  executeAddHotelRate: () => void;
  addingHotelRateIsLoading: boolean;
  rejectingIsLoading: boolean;
}>();
const labels = {
  cancel: {
    label: 'Anuluj',
    value: 'cancel',
  },
  rate: {
    label: 'Oceń pobyt',
    value: 'rate',
  },
};

const rejectDialogOpen = ref(false);
const rateDialogOpen = ref(false);

const canReject = computed(() => {
  return (
    !props.isInThePast &&
    props.reservation.status !== ReservationStatus.REJECTED &&
    props.reservation.status !== ReservationStatus.DELETED
  );
});

const canRate = computed(() => {
  return (
    props.isInThePast && props.reservation.status === ReservationStatus.ACCEPTED && !props.reservation.isAnyRateForHotel
  );
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
  const hotelId = props?.reservation?.hotelDto?.id;
  const reservationId = props?.reservation?.id;
  const rate = selectedRate.value;
  const comment = form?.values.comment || '';
  props.executeAddHotelRate({
    hotelId,
    reservationId,
    rate,
    comment,
  });
};
const sendButtonDisabled = computed(() => {
  return (
    props.addingHotelRateIsLoading ||
    form.errors.value.comment?.length ||
    !selectedRate.value ||
    !form.values.comment?.length
  );
});
</script>
