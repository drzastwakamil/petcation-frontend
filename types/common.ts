export enum ReservationStatus {
  PENDING = 'PENDING',
  DECLINECD = 'DECLINED',
}

export const getReservationStatusTitle = (status: ReservationStatus) => {
  switch (status) {
    case ReservationStatus.PENDING:
      return 'Czeka na potwierdzenie';

    case ReservationStatus.DECLINECD:
      return 'Odrzucona';
  }
};
