export type Channel = 'Booking.com' | 'Airbnb' | 'OLX' | 'Publi24' | 'Manual' | 'LongTerm';

export interface Room {
  id: string;
  number: string;
  type: 'Double Room' | 'Twin Room' | 'Junior Suite';
  status: 'Hotel' | 'LongTerm';
}

export interface Reservation {
  id: string;
  roomId: string;
  guestName: string;
  startDate: string; // ISO format
  endDate: string; // ISO format
  channel: Channel;
  status: 'Confirmed' | 'Request' | 'Complimentary' | 'Blocked' | 'CheckedOut' | 'InHouse' | 'ArrivalToday' | 'DepartureToday';
}

export interface Tenant {
  id: string;
  roomId: string;
  name: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
}

export interface UtilityBill {
  id: string;
  date: string;
  totalAmount: number;
  description: string;
}
