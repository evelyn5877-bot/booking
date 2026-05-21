'use client';

import { useState } from 'react';
import { CalendarGantt } from '@/components/CalendarGantt';
import { RoomModal } from '@/components/RoomModal';
import { UtilityManager } from '@/components/UtilityManager';
import { UnifiedInbox } from '@/components/UnifiedInbox';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { mockRooms, mockReservations as initialReservations } from '@/lib/mock-data';
import { Room, Reservation } from '@/types';

export default function Home() {
  const startDate = new Date('2025-04-25');
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleConverted = (newReservation: Reservation) => {
    setReservations([...reservations, newReservation]);
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">HibridRent Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your hotel and long-term rentals in one place.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Add Reservation
            </button>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg border">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium transition-all">7 Days</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-white shadow-sm">15 Days</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium">30 Days</button>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Reservations Calendar</h2>
            <div className="flex gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-sm"></span> Confirmed
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-sm"></span> Complimentary
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-sm"></span> Blocked
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm"></span> Request
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRooms.map(room => (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className="text-left p-4 border rounded-lg bg-white hover:border-blue-500 transition-all shadow-sm group"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">Room {room.number}</h3>
                    <p className="text-sm text-gray-500">{room.type}</p>
                  </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:underline">Manage Room →</span>
                </div>
              </button>
            ))}
          </div>
          <CalendarGantt rooms={mockRooms} reservations={reservations} startDate={startDate} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <section className="space-y-8">
            <UtilityManager activeRooms={mockRooms} />
            <ConnectionStatus />
          </section>
          <section>
            <UnifiedInbox />
          </section>
        </div>

        {selectedRoom && (
          <RoomModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
            onConverted={handleConverted}
          />
        )}
      </div>
    </main>
  );
}
