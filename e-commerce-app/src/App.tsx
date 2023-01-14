import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout";
import Browse from "./pages/browse";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route index element={<div> / page</div>} />
        <Route path="browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppRouter />;
}
