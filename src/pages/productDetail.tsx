/* eslint-disable react-hooks/rules-of-hooks */
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import {
  // useCategoriesQuery,/
  useProductDetailsQuery
  // useSearchProductsQuery
} from "../redux/api/productAPI";
import { server } from "../redux/store";
// import CartItem from "../components/cart-item";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

// import ProductCard from "../components/product-card";
// import { CartItem } from "../types/types";
// import { useState } from "react";
// import { Skeleton } from "../components/loader";

type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  if (isError) toast.error("Cannot Fetch the Products");

  const { price, photo, name, desc, stock } = data?.product || {
    photo: "",
    category: "",
    name: "",
    price: 0,
    desc: "",
    stock: 0
  };

  const addToCartHandler = () => {
    const cartItem: CartItem = {
      productId: params.id!,
      photo,
      name,
      price,
      quantity: 1,
      stock
    };

    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  // const { rdata } = useCategoriesQuery(category);
  // const {pdata } = useSearchProductsQuery(rdata);
  
  return (
    <>
      <div className="product-detail">
        <div className="product-image">
          <img
            src={`${server}/${photo}`}
            alt={name}
           
          />
          
        </div>
        <div className="product-desc">
          <h1>{name}</h1>
          <p>{desc}</p>
          <span>₹ {price}</span>
          <button onClick={addToCartHandler}>
            <FiShoppingCart />
          </button>
        </div>
      </div>
      {/* <div> */}
      {/* {pdata ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {pdata?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};

export default ProductDetail;
