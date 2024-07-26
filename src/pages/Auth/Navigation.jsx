import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GiEgyptianProfile } from "react-icons/gi";
import { FaUsers, FaSquareSteam } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Link , NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:flex sm:flex flex-col justify-between p-5  text-white bg-[#262222] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center ">
        <Link
          to="/"
          className="flex relative"
        >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
          </div>
        </Link>

        <Link
          to="/shop"
          className="flex relative"
        >
          <div className="flex items-center transition-transform transform hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
          </div>
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          </div>

          <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>
        {userInfo && userInfo.isAdmin && (
        
            <>
              <div className="flex items-center">
                 <h3 > _____</h3>
              </div> 
                         
              <Link
                className="flex relative"
                to="/admin/dashboard"
                
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <MdOutlineDashboard className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem] text-sm">Admin</span>{" "}
                </div>
                
              </Link>
            
              <Link
                className="flex relative"
                to="/admin/categorylist"
                
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <IoIosAdd className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem] text-xs">Category</span>{" "}
                </div>
                
              </Link>
            
              <Link
                className="flex relative"
                to="/admin/productlist"                             
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <IoIosAdd className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem] text-sm">Create</span>{" "}
                </div>
                
              </Link>
            
              <Link
                className="flex relative"
                to="/admin/allproductslist"
                
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <FaSquareSteam className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem]">Games</span>{" "}
                </div>
                
              </Link>
            
              <Link
                className="flex relative"
                to="/admin/userlist"                
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <FaUsers className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem]">Users</span>{" "}
                </div>
                
              </Link>
           
              <Link
                className="flex relative"
                to="/admin/orderlist"                
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <FiPackage className="mr-2 mt-[3rem]" size={20} />
                <span className="hidden nav-item-name mt-[3rem]"> Orders</span>{" "}
                </div>
                
              </Link>
              <h3 className="flex items-center "> _____</h3>
              </>
        
      )}
      <>        
          {userInfo ? (
           // <div className="flex flex-col justify-center  mb-10">      
           <>  
              <Link to="/profile" className="flex relative">
              <div className="flex items-center transition-transform transform hover:translate-x-2">
                <GiEgyptianProfile className="mr-2 mt-[3rem]" size={20} />
                <span className="text-white hidden nav-item-name mt-[3rem]">{userInfo.username}</span>{" "}
              </div>
              </Link>            
              <button
                onClick={logoutHandler}
                className="flex relative"
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <BiLogOut className="mt-[3rem] mr-2" size={20} />
                <span className="hidden nav-item-name mt-[3rem]">Logout</span>{" "}
                </div>
                
              </button>            

              </>  
           // </div>
          ) : (
            <></>
          )}
          
        {!userInfo && (
         
            //<div className="flex flex-col justify-center space-y-8 mb-10">
            <>
              <Link
                to="/login"
                className="flex relative mt-6 mb-6"
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[4px]" size={20} />
                <span className="hidden nav-item-name">   LOGIN</span>
                </div>
              </Link>
            
              <Link
                to="/register"
                className="flex relative"
              >
                <div className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineUserAdd size={20} />
                <span className="hidden nav-item-name"> {" "}REGISTER</span>
                </div>
              </Link>
          {/*  </div> */}
             </>
        )}
      </>
        
      </div>

      
    </div>
  );
};

export default Navigation;
