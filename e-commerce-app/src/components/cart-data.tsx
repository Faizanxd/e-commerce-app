import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../common/auth";
import { RootState } from "../store";

const { user } = useAuth();
const cart = useSelector((state: RootState) => state.cart?.value);

export function storeCartData() {
  if (cart.length > 0) {
    if (user?.email) {
      localStorage.setItem(user.email, JSON.stringify(cart));
    }
  } else {
    return null;
  }
}

export function getCartData() {
  if (user?.email) {
    const cartData = localStorage.getItem(user.email);
    if (cartData) {
      return JSON.parse(cartData);
    }
  }
}
