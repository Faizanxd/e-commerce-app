import { productInfo } from "./common/api";


export function getItemsCount(cartItems: productInfo[] | any) {
    return cartItems.reduce((sum: any, cartItems: { quantity: any; }) => cartItems.quantity + sum, 0)
}
