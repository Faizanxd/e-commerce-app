import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCardData, fetchRequest, productInfo } from "../common/api";
import { ENDPOINTS } from "../common/enpoints";
import { cart } from "../common/types";
import Loader from "../components/loader";
import Modal from "../components/modal";
import { addToCart } from "../redux/cart-slice";
import { RootState } from "../store";

export default function Browse() {
  let [isOpen, setIsOpen] = useState(true);
  const [cards, setCards] = useState<productInfo[]>();
  const [products, setProducts] = useState<productInfo>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart?.value);
  const disableCheckout = () => {
    const checkoutButton = document.querySelector("button");
    if (cart.length === 0) {
      checkoutButton?.classList.add("cursor-not-allowed");
      checkoutButton?.classList.add("opacity-50");
      checkoutButton?.classList.add("pointer-events-none");
    } else {
      checkoutButton?.classList.remove("cursor-not-allowed");
      checkoutButton?.classList.remove("opacity-50");
      checkoutButton?.classList.remove("pointer-events-none");
    }
  };

  async function fetchProductData() {
    const products = await fetchRequest<productInfo>(ENDPOINTS.ALL_PRODUCTS);
    setProducts(products);
    disableCheckout();
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  async function cardData(value: number) {
    const data = await fetchCardData<productInfo>(
      ENDPOINTS.ALL_PRODUCTS,
      value
    );

    setCards([data]);
  }

  function addProductToCart(product: typeof products) {
    dispatch(addToCart({ product, quantity: 1 }));
    navigate("/cart");
  }

  return products ? (
    <>
      <section className="mt-8">
        {products?.map((product) => {
          return (
            <section
              className="body-font inline-block text-white"
              key={product.id}
            >
              <div className="ml-[60px]">
                <div className="mx-auto flex px-2 py-6  md:w-[400px]">
                  <div className="w-full rounded-lg border-2 border-zinc-400 p-4 hover:border-gray-600">
                    <a className=" block h-48 overflow-hidden rounded">
                      <img
                        alt="product image"
                        className="h-full w-full object-contain  object-center "
                        src={product.image}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="title-font mb-1 text-xs tracking-widest text-white">
                        {product.category}
                      </h3>
                      <h2 className="title-font text-lg font-medium text-white line-clamp-1">
                        {product.title}
                      </h2>
                      <p className="mt-1 font-extrabold tracking-widest">
                        {product.price}$
                      </p>
                    </div>
                    <div className="">
                      <button
                        className="ml-auto flex rounded border-0 bg-indigo-500 py-2 px-6 text-white hover:bg-indigo-600 focus:outline-none"
                        onClick={() => addProductToCart(product as any)}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          onClick={() => cardData(product.id).then(openModal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="pl-2">
                        <p className="font-semibold">
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
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {cards &&
                  cards.map((card) => {
                    return (
                      <Modal
                        title={""}
                        description={""}
                        image={""}
                        price={0}
                        category={""}
                        id={0}
                        isOpen={isOpen}
                        {...card}
                        setIsOpen={setIsOpen}
                      />
                    );
                  })}
              </div>
            </section>
          );
        })}
      </section>
    </>
  ) : (
    <Loader />
  );
}
