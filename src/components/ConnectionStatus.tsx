'use client';

import React from 'react';
import { Wifi, WifiOff, AlertTriangle, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

interface Connection {
  id: string;
  name: string;
  type: 'API' | 'iCal' | 'Automation';
  status: 'Connected' | 'Error' | 'Expired';
  lastSync: string;
}

const connections: Connection[] = [
  { id: '1', name: 'Booking.com', type: 'API', status: 'Connected', lastSync: '2 mins ago' },
  { id: '2', name: 'Airbnb', type: 'API', status: 'Connected', lastSync: '5 mins ago' },
  { id: '3', name: 'OLX Romania', type: 'Automation', status: 'Expired', lastSync: '1 hour ago' },
  { id: '4', name: 'Publi24', type: 'Automation', status: 'Connected', lastSync: '15 mins ago' },
  { id: '5', name: 'Travelminit', type: 'iCal', status: 'Error', lastSync: '2 hours ago' },
];

export const ConnectionStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Channel Connections</h2>
        <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {connections.map((conn) => (
          <div key={conn.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={clsx(
                "p-2 rounded-lg",
                conn.status === 'Connected' ? "bg-green-50 text-green-600" :
                conn.status === 'Expired' ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
              )}>
                {conn.status === 'Connected' ? <Wifi size={20} /> : <WifiOff size={20} />}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{conn.name}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{conn.type} Connection</p>
              </div>
            </div>

            <div className="text-right">
              <div className={clsx(
                "text-xs font-medium px-2 py-1 rounded-full inline-block",
                conn.status === 'Connected' ? "bg-green-100 text-green-800" :
                conn.status === 'Expired' ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"
              )}>
                {conn.status}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Sync: {conn.lastSync}</p>
            </div>
          </div>
        ))}
      </div>

      {connections.some(c => c.status !== 'Connected') && (
        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-start">
          <AlertTriangle className="text-red-600 shrink-0" size={20} />
          <div>
            <p className="text-sm font-bold text-red-900">Action Required</p>
            <p className="text-xs text-red-700">The connection with OLX Romania has expired. Please re-authenticate to keep your ads synchronized.</p>
            <button className="mt-2 text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium">
              Re-authenticate OLX
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
