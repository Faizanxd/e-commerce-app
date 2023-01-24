import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/auth";

export default function Checkout() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  async function signOutofApp() {
    await signOut();
    navigate("/login");
  }
  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
        <img
          className="mb-10 w-5/6 rounded object-cover object-center md:w-3/6 lg:w-2/6"
          alt="hero"
          src="https://freepngimg.com/save/98948-pic-lmao-emoji-free-png-hq/600x315"
        />
        <div className="w-full text-center lg:w-2/3">
          <h1 className="title-font mb-4 text-3xl font-medium text-white sm:text-4xl">
            There is no Checkout Page
          </h1>
          <p className="mb-8 leading-relaxed text-gray-400">
            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
            tousled. Chambray dreamcatcher trust fund, kitsch vice godard
            disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh.
            Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo
            booth af fingerstache pitchfork.
          </p>
          <div className="flex justify-center">
            <button
              className="inline-flex rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
              onClick={() => navigate("/")}
            >
              Browse
            </button>
            <button
              className="ml-4 inline-flex rounded border-0 bg-gray-100 py-2 px-6 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none"
              onClick={signOutofApp}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
