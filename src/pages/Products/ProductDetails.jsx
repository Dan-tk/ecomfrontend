import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="container sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-white font-semibold hover:underline mt-4 block"
        >
          Go Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="flex flex-col lg:flex-row mt-4 lg:mt-8">
            {/* Image section */}
            <div className="flex-1 lg:w-1/2 mb-4 lg:mb-0 lg:pr-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Details section */}
            <div className="flex-1 lg:w-1/2 lg:pl-4">
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <p className="text-3xl font-bold mb-4">$ {product.price}</p>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <FaStore className="mr-2" /> Brand: {product.brand}
                </div>
                <div className="flex items-center mb-2">
                  <FaClock className="mr-2" /> Added: {moment(product.createAt).fromNow()}
                </div>
                <div className="flex items-center mb-2">
                  <FaStar className="mr-2" /> Reviews: {product.numReviews}
                </div>
                <div className="flex items-center mb-2">
                  <FaStar className="mr-2" /> Ratings: {rating}
                </div>
                <div className="flex items-center mb-2">
                  <FaShoppingCart className="mr-2" /> Quantity: {product.quantity}
                </div>
                <div className="flex items-center mb-2">
                  <FaBox className="mr-2" /> In Stock: {product.countInStock}
                </div>
              </div>

              <div className="mb-4">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 rounded-lg text-black"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-black text-white font-bold py-2 px-4 rounded-lg border-2 border-gray-500"
              >
                ADD TO CART
              </button>
            </div>

            <div className="mt-8">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
