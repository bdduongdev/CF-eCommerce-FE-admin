import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import CreateOrderForm from '../../components/orders/CreateOrderForm';// (nếu đã tách form ra)

export default function CreateOrder() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <Header />
          <h1 className="text-xl font-semibold text-gray-800">Create New Order</h1>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <CreateOrderForm />
        </div>
      </main>
    </div>
  );
}
