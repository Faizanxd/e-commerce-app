import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./common/auth";
import Layout from "./components/layout";
import Loader from "./components/loader";
import Browse from "./pages/browse";
import Cart from "./pages/cart";
import Login from "./pages/signIn";
import SignUp from "./pages/signUp";
import { Provider } from "react-redux";
import { store } from "./store";
import Checkout from "./pages/checkout";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    return <Navigate to="/login" />;
  }
  return children;
}

function RouteError() {
  return (
    <article className="grid place-content-center gap-2 p-4">
      <h1 className="text-4xl">The page you're looking for doesn't exist.</h1>
      <p className="text-2xl">
        Browse more content
        <Link to="/browse" className="p-2 font-extrabold hover:text-white">
          Here!
        </Link>
      </p>
    </article>
  );
}

function AppRouter() {
  const { loading, user } = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Layout />}>
            <Route index element={<Browse />} />
          </Route>
          <Route path="/cart" element={<Layout />}>
            <Route index element={<Cart />} />
          </Route>
          <Route path="/checkout" element={<Layout />}>
            <Route index element={<Checkout />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </>
    )
  );
  return loading && !user ? <Loader /> : <RouterProvider router={router} />;
}

export default function App() {
  return (
    <div className="font-Poppins">
      <AuthProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </AuthProvider>
    </div>
  );
}
