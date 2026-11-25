import { type RouteObject, useRoutes } from "react-router";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../components/home/Home"));
const Error403 = lazy(() => import("../error-pages/Error-403"));
const Error500 = lazy(() => import("../error-pages/Error-500"));

const routes: RouteObject[] = [
  // { path: "/login", element: <Login /> },
  { path: "/", element: <Home /> },
  { path: "errorPage403", element: <Error403 /> },
  { path: "errorPage500", element: <Error500 /> },
];

const AppRoutes = () => {
  const element = useRoutes(routes);
  // One Suspense boundary covers every lazy-loaded page.
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};

export default AppRoutes;
