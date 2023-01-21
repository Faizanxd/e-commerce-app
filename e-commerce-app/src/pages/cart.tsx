import { iteratorSymbol } from "immer/dist/internal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart?.value);
  const getTotal = () => {
    const total = cart
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
    return total;
  };
  const total: number = getTotal();
  const navigate = useNavigate();

  return total === null ? (
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
    <div className="container mx-auto p-6 ">
      <h1 className="mb-8 text-2xl font-medium">Shopping Cart</h1>
      <div className="overflow-hidden rounded-lg  bg-neutral-700/10 shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-4 text-sm font-medium text-white">Product</th>
              <th className="p-4 text-sm font-medium text-white">Title</th>
              <th className="p-4 text-sm font-medium text-white">Price</th>
              <th className="p-4 text-sm font-medium text-white">Quantity</th>

              <th className="p-4 text-sm font-medium text-white"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ product, quantity }) => {
              const total = product.price * quantity;
              return (
                <tr>
                  <td className="w-[100px]">
                    <img
                      src={product.image}
                      className=" w-full rounded-xl p-2"
                    />
                  </td>
                  <td className="p-4">{product.title}</td>
                  <td className="p-4">{product.price}$</td>
                  <td className="p-4">
                    <input
                      className="w-8 rounded-md border bg-dark text-center text-white"
                      type="number"
                      value={quantity}
                    />
                  </td>

                  <td className="p-4">
                    <button className="rounded-sm  bg-gradient-to-r  from-red-500 to-orange-500 p-2 text-white hover:from-orange-500 hover:to-red-500">
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Total</div>
            <div className="text-sm font-medium">{total}$</div>
          </div>
        </div>

        <div className=" p-4">
          <div className="flex justify-end">
            <button className="rounded-sm  bg-blue-500 bg-gradient-to-r from-indigo-500 to-blue-500 p-2 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:from-red-500 hover:to-indigo-500">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
