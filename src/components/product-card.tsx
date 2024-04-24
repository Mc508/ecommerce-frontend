import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, price, name, photo, stock, quantity: 1 })
          }
        >
          <FiShoppingCart />
        </button>
        <Link to={`/productdetail/${productId}`} className="link">
          <button>
            <FaPlus />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
