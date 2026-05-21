import { Room, Reservation } from '../types';
import { addDays, format, startOfMonth, addMonths } from 'date-fns';

const today = new Date('2025-04-25');

export const mockRooms: Room[] = [
  { id: '101', number: '101', type: 'Double Room', status: 'Hotel' },
  { id: '102', number: '102', type: 'Double Room', status: 'Hotel' },
  { id: '103', number: '103', type: 'Double Room', status: 'Hotel' },
  { id: '104', number: '104', type: 'Double Room', status: 'Hotel' },
  { id: '105', number: '105', type: 'Double Room', status: 'Hotel' },
  { id: '201', number: '201', type: 'Twin Room', status: 'Hotel' },
  { id: '202', number: '202', type: 'Twin Room', status: 'Hotel' },
  { id: '203', number: '203', type: 'Twin Room', status: 'Hotel' },
  { id: '301', number: '301', type: 'Junior Suite', status: 'Hotel' },
  { id: '302', number: '302', type: 'Junior Suite', status: 'Hotel' },
  { id: '303', number: '303', type: 'Junior Suite', status: 'Hotel' },
  { id: '304', number: '304', type: 'Junior Suite', status: 'Hotel' },
];

export const mockReservations: Reservation[] = [
  {
    id: 'res-1',
    roomId: '101',
    guestName: 'I. Iron Man',
    startDate: format(addDays(today, 1), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 5), 'yyyy-MM-dd'),
    channel: 'Booking.com',
    status: 'Complimentary',
  },
  {
    id: 'res-2',
    roomId: '101',
    guestName: 'A. Stark',
    startDate: format(addDays(today, 6), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 13), 'yyyy-MM-dd'),
    channel: 'Booking.com',
    status: 'Confirmed',
  },
  {
    id: 'res-3',
    roomId: '102',
    guestName: 'F. Firestorm',
    startDate: format(addDays(today, 6), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 15), 'yyyy-MM-dd'),
    channel: 'Airbnb',
    status: 'Confirmed',
  },
  {
    id: 'res-4',
    roomId: '105',
    guestName: 'T. Thor',
    startDate: format(addDays(today, 5), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 14), 'yyyy-MM-dd'),
    channel: 'Manual',
    status: 'Confirmed',
  },
  {
    id: 'res-5',
    roomId: '301',
    guestName: 'BLOCKED',
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(addDays(today, 3), 'yyyy-MM-dd'),
    channel: 'Manual',
    status: 'Blocked',
  },
  {
    id: 'res-6',
    roomId: '201',
    guestName: 'S. Thomas',
    startDate: format(addDays(today, 0), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 6), 'yyyy-MM-dd'),
    channel: 'Booking.com',
    status: 'ArrivalToday',
  },
];
