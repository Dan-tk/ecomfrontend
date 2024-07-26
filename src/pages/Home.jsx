import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="bg-slate-950 min-h-screen text-white ">
      <div className="hidden md:block">
        {!keyword ? <Header /> : null}
     </div>
      
      
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center md:items-start md:flex-row justify-between p-4">
            <h1 className="text-4xl font-bold mb-4 md:mb-0">
              Popular Titles
            </h1>

            <Link
              to="/shop"
              className="bg-sky-600 text-white font-bold rounded-full py-2 px-6 md:px-10 hover:bg-sky-700 transition duration-300"
            >
              Explore More
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start p-4">
            {data.products.map((product) => (
              <div key={product._id} className="m-2">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
