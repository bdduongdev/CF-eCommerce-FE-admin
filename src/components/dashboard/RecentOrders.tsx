interface Order {
  product: string;
  price: string;
  status: "Pending" | "Completed";
  date: string;
}

const orders: Order[] = Array(10).fill({
  product: "iPhone 13",
  price: "VNĐ730,000.00",
  status: "Pending",
  date: "12 Sept 2022",
});

const RecentOrders: React.FC = () => {
  return (
    // <div className="bg-white p-4 rounded shadow-sm w-full">
    //   <h3 className="font-semibold mb-2">Recent Orders</h3>
    //   {orders.map((order, idx) => (
    //     <div key={idx} className="flex justify-between items-center py-2 border-b text-sm">
    //       <div className="flex gap-2 items-center">
    //         <div className="w-8 h-8 bg-gray-300 rounded"></div>
    //         <span>{order.product}</span>
    //       </div>
    //       <div>{order.price}</div>
    //       <div className={`text-xs ${order.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
    //         {order.status}
    //       </div>
    //       <div>{order.date}</div>
    //     </div>
    //   ))}
    // </div>

    //  <div className="bg-white p-4 rounded shadow h-fit">
    //   <h2 className="font-semibold mb-4">Recent Orders</h2>
    //   <ul className="space-y-3">
    //     {orders.map((order, i) => (
    //       <li key={i} className="flex justify-between items-center text-sm">
    //         <div className="flex items-center gap-3">
    //           <div className="w-8 h-8 bg-gray-200 rounded-md" />
    //           <div>
    //             <p>{order.product}</p>
    //             <p className="text-gray-400">{order.price} × 1</p>
    //           </div>
    //         </div>
    //         <div className="flex items-end flex-col text-right">
    //           <p className={`text-xs ${order.status === 'Completed' ? 'text-green-500' : 'text-orange-500'}`}>
    //             {order.status}
    //           </p>
    //           <p className="text-gray-400 text-xs">{order.date}</p>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
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
