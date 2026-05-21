import { Room, Reservation } from '../../types';
import { format } from 'date-fns';

export async function convertToLongTerm(
  room: Room,
  startDate: string,
  endDate: string,
  tenantName: string
): Promise<{ success: boolean; newReservation?: Reservation }> {
  console.log(`Converting Room ${room.number} to Long Term for ${tenantName}`);

  // M1: Simulate closing availability on Booking.com and Airbnb
  console.log(`[M1] Closing availability for Room ${room.number} from ${startDate} to ${endDate} on Booking.com and Airbnb...`);

  // M2: Simulate deactivating OLX/Publi24 ads
  console.log(`[M2] Deactivating ads for Room ${room.number} on OLX and Publi24...`);

  const longTermReservation: Reservation = {
    id: `lt-${room.id}-${Date.now()}`,
    roomId: room.id,
    guestName: tenantName,
    startDate,
    endDate,
    channel: 'LongTerm',
    status: 'Confirmed',
  };

  return {
    success: true,
    newReservation: longTermReservation,
  };
}
