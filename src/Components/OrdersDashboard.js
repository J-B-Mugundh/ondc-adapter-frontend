import React, { useState, useEffect } from "react";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders data from the backend API
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ondc/orders`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex justify-center items-center">
      <div className="container p-6 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-full space-y-6">
        <h1 className="text-4xl text-center font-semibold text-gray-900 mb-8">Orders Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-16 w-16 border-t-4 border-blue-600 rounded-full"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white rounded-2xl shadow-md border-separate border-spacing-0">
              <thead className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-left">Order ID</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Customer</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Platform</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Total Price</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Created At</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Order Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Payment Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-left">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-100 cursor-pointer transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      {/* Truncate Order ID if longer than 20 chars */}
                      {order.id.length > 20 ? `${order.id.substring(0, 20)}...` : order.id}
                    </td>
                    <td className="px-6 py-4 text-sm">{order.customer}</td>
                    <td className="px-6 py-4 text-sm">{order.platform}</td>
                    <td className="px-6 py-4 text-sm">
  {/* Extract number if it's a string */}
  {order.total_price ? `₹${(parseFloat(order.total_price.replace(/[^\d.-]/g, '')) * 82.75).toFixed(2)}` : "N/A"}
</td>

                    <td className="px-6 py-4 text-sm">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.order_status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : order.order_status === "Under Verification"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{order.payment_status}</td>
                    <td className="px-6 py-4 text-sm">{order.delivery_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
