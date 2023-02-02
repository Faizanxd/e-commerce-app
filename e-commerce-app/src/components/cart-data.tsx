import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAuth } from "../common/auth";
import { productInfo } from "../common/types";
import { addToCart } from "../redux/cart-slice";
import { RootState } from "../store";

const { user } = useAuth();
const cart = useSelector((state: RootState) => state.cart?.value);
const dispatch = useDispatch();

export function storeCartData() {
  if (cart.length > 0) {
    if (user?.email) {
      localStorage.setItem(user.email, JSON.stringify(cart));
    }
  } else {
    return null;
  }
}

export function getCartData(): {
  product: productInfo;
  quantity: number;
} | null {
  if (user?.email) {
    const data = localStorage.getItem(user.email);
    if (data) {
      return JSON.parse(data).map(
        (item: { product: productInfo; quantity: number }) => {
          return {
            product: item.product,
            quantity: item.quantity,
          };
        }
      );
    }
  }
  return null;
}

useEffect(() => {
  getCartData();
}, []);

export function existingCartData() {
  const data = getCartData();
  if (data) {
    dispatch(addToCart(data as { product: productInfo; quantity: number }));
  }
  return data;
}
