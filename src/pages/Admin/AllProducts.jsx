import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";


const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-white">Error loading products</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen  text-white p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="text-xl font-bold mb-4">
            All Products ({products.length})
          </div>
          <div className="flex flex-wrap justify-around items-start">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-4 w-full md:w-[30%] lg:w-[23%]"
              >
                <div className="flex flex-col h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[15rem] object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-xl font-semibold">{product?.name}</h5>
                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500"
                      >
                        Update Product
                        <svg
                          className="w-4 h-4 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p className="text-lg font-semibold">${product?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
          
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
