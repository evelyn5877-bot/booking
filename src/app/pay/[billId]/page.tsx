'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Camera, CreditCard, CheckCircle } from 'lucide-react';

export default function TenantPaymentPage() {
  const { billId } = useParams();
  const [step, setStep] = useState(1);
  const [meterIndex, setMeterIndex] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h1 className="text-xl font-bold">HibridRent Payment</h1>
          <p className="text-indigo-100 text-sm">Invoice #{billId}</p>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-500 text-sm uppercase font-semibold">Total to Pay</p>
                <p className="text-4xl font-black text-gray-900">100.00 RON</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Electricity Meter Index (Optional)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter current index"
                    value={meterIndex}
                    onChange={(e) => setMeterIndex(e.target.value)}
                  />
                </div>

                <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:bg-gray-50 transition-colors">
                  <Camera size={20} />
                  <span className="text-sm font-medium">Upload Meter Photo</span>
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 text-white rounded-xl py-4 font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Pay with Card
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center space-y-6 py-4">
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-600 p-4 rounded-full">
                  <CheckCircle size={48} />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
                <p className="text-gray-500">The invoice has been paid and registered with ANAF (e-Factura).</p>
              </div>
              <button
                className="w-full border rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                onClick={() => window.close()}
              >
                Close Window
              </button>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 text-center border-t">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">Powered by HibridRent PMS</p>
        </div>
      </div>
    </div>
  );
}
