'use client';

import React from 'react';
import { format, addDays, startOfDay, isWithinInterval, parseISO, differenceInDays } from 'date-fns';
import { Room, Reservation } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BookingIcon, AirbnbIcon, OLXIcon, LongTermIcon } from './Icons';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CalendarGanttProps {
  rooms: Room[];
  reservations: Reservation[];
  startDate: Date;
}

const DAYS_TO_SHOW = 15;

export const CalendarGantt: React.FC<CalendarGanttProps> = ({ rooms, reservations, startDate }) => {
  const days = Array.from({ length: DAYS_TO_SHOW }, (_, i) => addDays(startDate, i));

  const getReservationColor = (status: Reservation['status']) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-500 text-white';
      case 'Request': return 'bg-red-500 text-white';
      case 'Complimentary': return 'bg-yellow-500 text-black';
      case 'Blocked': return 'bg-purple-500 text-white';
      case 'ArrivalToday': return 'bg-emerald-400 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getChannelIcon = (channel: Reservation['channel']) => {
    switch (channel) {
      case 'Booking.com': return <span className="font-bold mr-1">[B]</span>;
      case 'Airbnb': return <span className="font-bold mr-1">[A]</span>;
      case 'OLX': return <span className="font-bold mr-1">[O]</span>;
      case 'LongTerm': return <span className="font-bold mr-1">[TL]</span>;
      default: return null;
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 min-w-[150px] sticky left-0 bg-gray-100 z-10">Room</th>
            {days.map((day) => (
              <th key={day.toISOString()} className={cn(
                "border p-2 min-w-[100px] text-center text-xs",
                (day.getDay() === 0 || day.getDay() === 6) && "bg-red-50 text-red-500"
              )}>
                <div>{format(day, 'd')}</div>
                <div>{format(day, 'MMM')}</div>
                <div className="text-[10px] uppercase font-light">{format(day, 'EEE')}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="h-16">
              <td className="border p-2 sticky left-0 bg-white z-10 font-medium">
                <div className="flex flex-col">
                  <span>{room.number}</span>
                  <span className="text-[10px] text-gray-400 uppercase">{room.type}</span>
                </div>
              </td>
              {days.map((day) => {
                const reservation = reservations.find(r =>
                  r.roomId === room.id &&
                  isWithinInterval(startOfDay(day), {
                    start: startOfDay(parseISO(r.startDate)),
                    end: startOfDay(parseISO(r.endDate))
                  })
                );

                if (reservation && format(parseISO(reservation.startDate), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')) {
                  const duration = differenceInDays(parseISO(reservation.endDate), parseISO(reservation.startDate)) + 1;
                  return (
                    <td key={day.toISOString()} className="border p-0 relative overflow-visible">
                      <div
                        className={cn(
                          "absolute top-1 left-1 bottom-1 z-20 rounded p-1 text-[10px] flex items-center shadow-sm truncate",
                          getReservationColor(reservation.status)
                        )}
                        style={{ width: `calc(${duration * 100}% - 8px)` }}
                      >
                        {getChannelIcon(reservation.channel)}
                        {reservation.guestName}
                      </div>
                    </td>
                  );
                }

                return <td key={day.toISOString()} className="border p-0"></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
