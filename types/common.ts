export enum ReservationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DELETED = 'DELETED',
  REJECTED = 'REJECTED',
}

export const getReservationStatusTitle = (status: ReservationStatus) => {
  switch (status) {
    case ReservationStatus.PENDING:
      return 'Czeka na potwierdzenie';
    case ReservationStatus.ACCEPTED:
      return 'Potwierdzona';
    case ReservationStatus.DELETED:
      return 'Anulowana';
    case ReservationStatus.REJECTED:
      return 'Odrzucona';
  }
};
