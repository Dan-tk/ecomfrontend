import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();

  if (loadingSales || loadingCustomers || loadingOrders) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      
      <section className="p-4 xl:ml-[4rem] md:ml-[0rem]">
        <div className="flex flex-wrap justify-around">
          <div className="bg-gray-800 rounded-lg p-5 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] mb-5">
            <p className="text-center text-gray-400">Sales</p>
            <h1 className="text-2xl font-bold text-center">
              ${sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="bg-gray-800 rounded-lg p-5 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] mb-5">
            <p className="text-center text-gray-400">Customers</p>
            <h1 className="text-2xl font-bold text-center">
              {customers?.length}
            </h1>
          </div>
          <div className="bg-gray-800 rounded-lg p-5 w-full sm:w-[45%] md:w-[30%] lg:w-[22%] mb-5">
            <p className="text-center text-gray-400">All Orders</p>
            <h1 className="text-2xl font-bold text-center">
              {orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="mt-4">
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
