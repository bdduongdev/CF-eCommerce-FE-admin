interface Order {
  product: string;
  price: string;
  status: "Pending" | "Completed";
  date: string;
}

const orders: Order[] = Array(10).fill({
  product: "iPhone 13",
  price: "₦730,000.00",
  status: "Pending",
  date: "12 Sept 2022",
});

const RecentOrders: React.FC = () => {
  return (
  
    <div className="bg-white p-6 rounded-lg border flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        🛍️
      </div>
      <p className="text-lg font-medium mb-1">No Orders Yet?</p>
      <p className="text-sm text-gray-500 mb-4">Add products to your store and start selling to see orders here.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">New Product</button>
    </div>
  );
};

export default RecentOrders;
