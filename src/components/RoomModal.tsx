'use client';

import React, { useState } from 'react';
import { Room } from '../types';
import { convertToLongTerm } from '../lib/actions/room-actions';

interface RoomModalProps {
  room: Room;
  onClose: () => void;
  onConverted: (reservation: any) => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({ room, onClose, onConverted }) => {
  const [startDate, setStartDate] = useState('2025-10-01');
  const [endDate, setEndDate] = useState('2026-06-01');
  const [tenantName, setTenantName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConvert = async () => {
    setIsSubmitting(true);
    const result = await convertToLongTerm(room, startDate, endDate, tenantName);
    if (result.success) {
      onConverted(result.newReservation);
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Manage Room {room.number}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Conversion Type</label>
            <select className="mt-1 block w-full border rounded-md p-2 bg-gray-50" defaultValue="longterm">
              <option value="longterm">Switch to Long Term</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tenant Name</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g. John Doe"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded-md p-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                className="mt-1 block w-full border rounded-md p-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConvert}
              disabled={isSubmitting || !tenantName}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Conversion'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
