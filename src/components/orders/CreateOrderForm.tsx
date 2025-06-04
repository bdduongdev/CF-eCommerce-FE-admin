import React from 'react';

export default function CreateOrderForm() {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Left Column: Order Info */}
      <div className="space-y-4">
        {/* Customer */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Customer</label>
          <select className="w-full border px-3 py-2 rounded text-sm bg-white">
            <option value="">Select Customer</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>
        </div>

        {/* Payment Type & Order Type */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Payment Type</label>
            <select className="w-full border px-3 py-2 rounded text-sm bg-white">
              <option value="">Select Payment</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Order Type</label>
            <select className="w-full border px-3 py-2 rounded text-sm bg-white">
              <option value="">Select Order Type</option>
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Order Date</label>
            <input type="date" className="w-full border px-3 py-2 rounded text-sm bg-white" />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Order Time</label>
            <input type="time" className="w-full border px-3 py-2 rounded text-sm bg-white" />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
          <select className="w-full border px-3 py-2 rounded text-sm bg-white">
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Order Note</label>
          <textarea
            className="w-full border px-3 py-2 rounded text-sm"
            rows={4}
            placeholder="Optional note..."
          />
        </div>
      </div>

      {/* Right Column: Product Search/Add */}
      <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50">
        <input
          type="text"
          placeholder="Search product name"
          className="w-full border px-3 py-2 rounded text-sm mb-4"
        />
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-2">
          🛒
        </div>
        <p className="font-medium text-sm">Add Products to Your Order</p>
        <p className="text-xs text-gray-500">Search and add products to this order.</p>
      </div>
    </form>
  );
}
