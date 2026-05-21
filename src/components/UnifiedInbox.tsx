'use client';

import React, { useState } from 'react';
import { BookingIcon, AirbnbIcon, OLXIcon } from './Icons';
import { clsx } from 'clsx';

interface Message {
  id: string;
  source: 'Booking.com' | 'Airbnb' | 'OLX' | 'Publi24';
  sender: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const mockMessages: Message[] = [
  { id: '1', source: 'Booking.com', sender: 'John Doe', lastMessage: 'What time is check-in?', timestamp: '10:30 AM', unread: true },
  { id: '2', source: 'Airbnb', sender: 'Sarah Smith', lastMessage: 'Is the parking free?', timestamp: 'Yesterday', unread: false },
  { id: '3', source: 'OLX', sender: 'Andrei G.', lastMessage: 'Mai este disponibila camera?', timestamp: 'Monday', unread: true },
  { id: '4', source: 'Publi24', sender: 'Maria Popescu', lastMessage: 'Doresc o vizionare pentru saptamana viitoare.', timestamp: 'Sunday', unread: false },
];

export const UnifiedInbox: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getIcon = (source: Message['source']) => {
    switch (source) {
      case 'Booking.com': return <BookingIcon />;
      case 'Airbnb': return <AirbnbIcon />;
      case 'OLX': return <OLXIcon />;
      default: return <span className="font-bold text-gray-500">P</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden flex h-[500px]">
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-800">Unified Inbox</h2>
        </div>
        <div className="divide-y">
          {mockMessages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedId(msg.id)}
              className={clsx(
                "w-full p-4 text-left hover:bg-gray-50 transition-colors flex gap-3 items-start",
                selectedId === msg.id && "bg-blue-50",
                msg.unread && "font-semibold"
              )}
            >
              <div className="mt-1">{getIcon(msg.source)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="truncate">{msg.sender}</span>
                  <span className="text-[10px] text-gray-400 font-normal">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{msg.lastMessage}</p>
              </div>
              {msg.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedId ? (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">{mockMessages.find(m => m.id === selectedId)?.sender}</h3>
              <span className="text-xs text-gray-400">via {mockMessages.find(m => m.id === selectedId)?.source}</span>
            </div>
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%] border">
                <p className="text-sm">{mockMessages.find(m => m.id === selectedId)?.lastMessage}</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2 text-sm"
                  placeholder="Type your reply..."
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 italic">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  );
};
