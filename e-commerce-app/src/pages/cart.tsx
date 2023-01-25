import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { productInfo } from "../common/types";

import { addToCart, removeFromCart } from "../redux/cart-slice";
import { RootState } from "../store";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart?.value);

  const getTotal = () => {
    const total = cart
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
    return total;
  };
  const total = getTotal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleQuantityChange(
    e: React.ChangeEvent<HTMLInputElement>,
    { product, quantity }: { product: productInfo; quantity: number }
  ) {
    const value = parseInt(e.currentTarget.value);
    if (value < quantity) {
      dispatch(removeFromCart({ product }));
    }
    dispatch(addToCart({ product }));
  }

  return cart.length === 0 ? (
    <section className="body-font bg-gray-900 text-gray-400">
      <div className="container mx-auto px-5 py-24">
        <div className="mx-auto flex flex-col items-start sm:flex-row sm:items-center lg:w-2/3">
          <h1 className="title-font flex-grow text-2xl font-medium text-white sm:pr-16">
            Seems you're cart is empty
          </h1>
          <button
            className="mt-10 flex-shrink-0 rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none sm:mt-0"
            onClick={() => navigate("/")}
          >
            Browse Here
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>
      <div className="overflow-hidden rounded-lg bg-neutral-700/10 shadow-md">
        <ol className="list-none">
          {cart.map(({ product, quantity }) => {
            return (
              <div key={product.id}>
                <li className="flex items-center border-b p-4">
                  <img src={product.image} className="h-20 w-20 rounded-lg" />
                  <div className="ml-4">
                    <p className="text-lg font-medium ">{product.title}</p>
                    <p className="text-sm tracking-widest text-white">
                      {product.price}$
                    </p>
                    <p className="font-base text-sm">
                      {product.rating.rate}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="inline-block h-4 w-4 text-yellow-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <form action="">
                      <label className="mr-2 text-sm text-white">
                        Quantity:
                      </label>
                      <input
                        id={`${product.id}-product.id`}
                        className="w-8 rounded-md border bg-dark text-center text-white"
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(e, { product, quantity })
                        }
                      />
                    </form>
                  </div>
                  <button
                    className="ml-4  rounded-sm  bg-gradient-to-r from-red-500 to-orange-500 p-2 text-white hover:from-orange-500 hover:to-red-500"
                    onClick={() => {
                      dispatch(removeFromCart({ product }));
                    }}
                  >
                    Remove
                  </button>
                </li>
              </div>
            );
          })}
        </ol>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-sm font-medium text-white">Total</div>
            <div className="text-sm font-medium text-white">{total}$</div>
          </div>
        </div>

        <div className=" p-4">
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/checkout")}
              className="rounded-sm  bg-blue-500 bg-gradient-to-r from-indigo-500 to-blue-500 p-2 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:from-red-500 hover:to-indigo-500"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
