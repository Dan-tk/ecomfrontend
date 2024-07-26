import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";


const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="bg-slate-950  text-white min-h-screen ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
         
          <div className="md:w-3/4 w-full p-4">
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 border border-gray-700 rounded-lg">
                <thead className="border-b border-gray-600">
                  <tr>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">ITEMS</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">ID</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">USER</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">DATE</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">TOTAL</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">PAID</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-gray-300">DELIVERED</th>
                    <th className="py-2 md:py-3 px-2 md:px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-700">
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <img
                          src={order.orderItems[0].image}
                          alt={order._id}
                          className="w-[3rem] md:w-[4rem] h-[3rem] md:h-[4rem] object-cover rounded-lg"
                        />
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">{order._id}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        {order.user ? order.user.username : "N/A"}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">$ {order.totalPrice}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        {order.isPaid ? (
                          <p className="bg-green-600 text-white p-1 md:p-2 rounded-full text-center">
                            Completed
                          </p>
                        ) : (
                          <p className="bg-red-600 text-white p-1 md:p-2 rounded-full text-center">
                            Pending
                          </p>
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        {order.isDelivered ? (
                          <p className="bg-green-600 text-white p-1 md:p-2 rounded-full text-center">
                            Completed
                          </p>
                        ) : (
                          <p className="bg-red-600 text-white p-1 md:p-2 rounded-full text-center">
                            Pending
                          </p>
                        )}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-blue-600 text-white py-1 px-2 md:py-2 md:px-3 rounded-lg hover:bg-blue-700">
                            More
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
