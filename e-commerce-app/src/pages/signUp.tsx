import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../common/auth";

export default function signUp() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  async function authenticateUser(event: React.SyntheticEvent) {
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    event.preventDefault();
    await signUp(email.value, password.value);
  }
  return (
    <>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center   ">
        <div className="xs:w-full h-screen w-full bg-white px-8 py-8 tracking-widest shadow-none sm:h-auto sm:w-8/12 sm:px-12 sm:shadow-lg md:w-7/12 lg:w-7/12 xl:w-2/6">
          <div className="w-full p-4 text-center text-3xl font-bold text-black">
            SIGN UP
          </div>
          <div className="height: 1px my-3 w-full bg-gray-200"></div>
          <form onSubmit={authenticateUser}>
            <div className="flex flex-col gap-4 px-0 py-4">
              <div>
                <label className="text-gray-700">Email address</label>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-11 p-2.5 px-3 text-2xl font-medium text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="w-full border border-gray-200 py-2 pl-10 text-black"
                  placeholder="Email address"
                  type="email"
                  name="email"
                />
              </div>
              <div>
                <label className="text-gray-700">Password</label>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-11 p-2.5 px-3 text-2xl font-medium text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  className="w-full border border-gray-200 py-2 pl-10 text-black"
                  placeholder="Password"
                  type="password"
                  name="password"
                />
              </div>
              <div className="flex w-full flex-row justify-center gap-2 pt-6">
                <button
                  className="flex w-6/12 flex-row items-center justify-center gap-1 border border-indigo-500 p-0 text-indigo-500 duration-100 ease-in-out hover:bg-indigo-500 hover:text-white"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
