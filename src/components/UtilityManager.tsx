'use client';

import React, { useState } from 'react';
import { Room } from '../types';

interface UtilityManagerProps {
  activeRooms: Room[];
}

export const UtilityManager: React.FC<UtilityManagerProps> = ({ activeRooms }) => {
  const [totalBill, setTotalBill] = useState<number>(0);
  const [description, setDescription] = useState('Utility Bill - October');
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const splitCost = totalBill / (activeRooms.length || 1);

  const generatePaymentLinks = () => {
    // Simulate SmartBill/ANAF e-Factura integration
    console.log(`[SmartBill] Generating invoice for ${description}...`);
    console.log(`[ANAF] Submitting e-Factura...`);

    // Mock payment link generation
    setPaymentLink(`https://pay.hibridrent.ro/bill-${Math.random().toString(36).substr(2, 9)}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Utility Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Bill Amount (RON)</label>
            <input
              type="number"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="0.00"
              value={totalBill || ''}
              onChange={(e) => setTotalBill(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            onClick={generatePaymentLinks}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Split & Generate Payment Links
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-dashed flex flex-col justify-center items-center text-center">
          <p className="text-sm text-gray-500 uppercase font-semibold">Cost per Room</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{splitCost.toFixed(2)} RON</p>
          <p className="text-xs text-gray-400 mt-1">Split among {activeRooms.length} rooms</p>

          {paymentLink && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md w-full">
              <p className="text-xs text-green-700 font-medium">Payment Link Generated:</p>
              <a href="#" className="text-xs text-blue-600 underline break-all">{paymentLink}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
