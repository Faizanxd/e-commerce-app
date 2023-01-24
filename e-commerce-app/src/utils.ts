import { productInfo } from "./common/types";
import { CartState } from "./redux/cart-slice";

export function getItemsCount(cartItems: CartState[] & productInfo) {
    return cartItems.reduce((sum: number, cartItems: { quantity: number; }) => cartItems.quantity + sum, 0)
}
