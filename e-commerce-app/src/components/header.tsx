import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../common/auth";
import { RootState } from "../store";
import { getItemsCount } from "../utils";

export default function Header() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  async function signOutofApp() {
    await signOut();
    navigate("/login");
  }
  const cartItems = useSelector((state: RootState) => state.cart?.value);
  const count = getItemsCount(cartItems);
  const countIf = count > 0 ? count : null;

  return (
    <header className="body-font text-white">
      <div className=" mx-auto flex flex-col flex-wrap items-center justify-between p-5 md:flex-row">
        <Link to={"/"}>
          <a className="title-font mb-4 flex items-center font-medium text-white md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span className="ml-3 text-xl">amazon but i'm retarded</span>
          </a>
        </Link>

        <section className="inline-flex text-white">
          <section className="pr-2">
            <button
              className={`mt-4 inline-flex items-center rounded border-0 bg-zinc-400/50 py-1 px-3 text-base hover:bg-gray-400 focus:outline-none md:mt-0  ${
                countIf ? "bg-white font-extrabold text-indigo-500" : ""
              }`}
              onClick={() => navigate("/cart")}
            >
              {countIf ?? "Cart"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </section>
          <section className="pr-2">
            <button
              className="mt-4 inline-flex items-center rounded border-0 bg-zinc-400/50 py-1 px-3 text-base hover:bg-gray-400 focus:outline-none md:mt-0"
              onClick={signOutofApp}
            >
              Log Out
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="ml-1 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </section>
        </section>
      </div>
    </header>
  );
}
