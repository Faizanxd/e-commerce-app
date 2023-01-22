import { productInfo } from "./common/api";
import { CartState } from "./redux/cart-slice";

export function getItemsCount(cartItems: CartState[] | any) {
    return cartItems.reduce((sum: number, cartItems: { quantity: number; }) => cartItems.quantity + sum, 0)
}
