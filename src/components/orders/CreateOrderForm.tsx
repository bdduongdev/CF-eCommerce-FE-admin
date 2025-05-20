import { X } from 'lucide-react';
import React from 'react';



export default function CreateOrderForm() {
  

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <select className="w-full border p-2 rounded text-sm"><option>Select Customer</option></select>
        <div className="flex gap-2">
          <select className="flex-1 border p-2 rounded text-sm"><option>Payment Type</option></select>
          <select className="flex-1 border p-2 rounded text-sm"><option>Order Type</option></select>
        </div>
        <div className="flex gap-2">
          <input type="date" className="flex-1 border p-2 rounded text-sm" />
          <input type="time" className="flex-1 border p-2 rounded text-sm" />
        </div>
        <select className="w-full border p-2 rounded text-sm"><option>Pending</option></select>
        <textarea placeholder="Order Note" className="w-full border p-2 rounded text-sm" rows={4} />
      </div>

      <div className="flex flex-col items-center justify-center border rounded-lg p-6 text-center bg-gray-50">
        <input type="text" placeholder="Search product name" className="w-full mb-4 border p-2 rounded text-sm" />
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center">🛍️</div>
        <p className="text-sm font-medium">Add Products to Your Order</p>
        <p className="text-xs text-gray-400">Search and add products to this order.</p>
      </div>
    </form>
  );
}
