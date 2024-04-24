import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cartItems = useSelector(
    (state: RootState) => state.cartReducer.cartItems.length
  );

  // Calculate total number of items in the cart
  const total = cartItems;

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="header">
      <img src={logo} alt="img" />
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        Search <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        Cart <FaShoppingBag />
        <span>{total}</span>
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            {user.photo ? (
              <img
                src={user?.photo}
                alt="User"
                style={{ height: "40px", width: "40px", margin: "auto" }}
              />
            ) : (
              <FaUser />
            )}
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                  Admin
                </Link>
              )}

              <Link onClick={() => setIsOpen(false)} to="/orders">
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
