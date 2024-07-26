import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto p-4">
      {cartItems.length === 0 ? (
        <div className="text-center">
          Your cart is empty <Link to="/shop" className="text-blue-500">Go To Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-3/4 mr-10">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center mb-4 pb-2 bg-zinc-900 rounded-md">
                <div className="w-[5rem] h-[5rem] mb-2 md:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 md:ml-4">
                  <Link to={`/product/${item._id}`} className="text-white-500 text-lg font-medium">
                    {item.name}
                  </Link>

                  <div className="mt-2 text-white">{item.brand}</div>
                  <div className="mt-2 text-white font-bold">
                    $ {item.price}
                  </div>
                </div>

                <div className="w-full md:w-24 mt-2 md:mt-0">
                  <select
                    className="w-full p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2 md:mt-0">
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/4 mt-4 md:mt-0">
            <div className="p-4 bg-zinc-900 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>

              <div className="text-2xl font-bold mb-4">
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>

              <button
                className="bg-blue-500 py-2 px-4 rounded-full text-lg w-full"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Cart;
