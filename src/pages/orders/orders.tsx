import { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import StatCard from '../../components/orders/StartCard';
import OrderTable from '../../components/orders/OrderTable';
import CreateOrderModal from '../../components/orders/CreateOrderForm';

import {
  ShoppingBag,
  XCircle,
  ShoppingCart,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orders() {
 

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-4">
        {/* Header with button */}
        <div className="flex justify-between items-center mb-4">
          <Header />
          <Link
              to="/orders/create"
  className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
>
  + Create a New Order
</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
          <StatCard icon={<ShoppingBag size={18} />} title="All Orders" value="450" />
          <StatCard icon={<ShoppingBag size={18} />} title="Pending" value="5" />
          <StatCard icon={<ShoppingBag size={18} />} title="Completed" value="320" />
          <StatCard icon={<XCircle size={18} />} title="Canceled" value="30" subtitle="-20%" subtitleClass="text-red-500" />
          <StatCard icon={<ShoppingCart size={18} />} title="Abandoned Cart" value="20%" subtitle="+0.00%" subtitleClass="text-green-500" />
        </div>

        
        <OrderTable />

       
      </main>
    </div>
  );
}
