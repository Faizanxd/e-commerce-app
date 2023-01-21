import { productInfo } from "./common/api";


export function getItemsCount(cartItems: productInfo[] | any) {
    return cartItems.reduce((sum: number, cartItems: { quantity: number; }) => cartItems.quantity + sum, 0)
}
