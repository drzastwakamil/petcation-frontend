export enum ReservationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINECD = 'DECLINED',
}

export const getReservationStatusTitle = (status: ReservationStatus) => {
  switch (status) {
    case ReservationStatus.PENDING:
      return 'Czeka na potwierdzenie';
    case ReservationStatus.ACCEPTED:
      return 'Potwierdzona';
    case ReservationStatus.DECLINECD:
      return 'Odrzucona';
  }
};
