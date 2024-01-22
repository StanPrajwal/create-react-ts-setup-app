import { RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("../components/home/Home"));
const Error403 = lazy(() => import("../error-pages/Error-403"));
const Error500 = lazy(() => import("../error-pages/Error-500"));
const AppRoutes = () => {
  //   const LoginRoutes: RouteObject = {
  //     path: "/",
  //     element: <AuthLayout />,
  //     children: [{ path: "/", element: <Login /> }],
  //   };

  const MainRoutes: RouteObject = {
    path: "/",
    element: <Home />
  };
  const errorRoute403: RouteObject = {
    path: "errorPage403",
    element: (
      <Suspense fallback={<div>Loadig....</div>}>
        <Error403 />
      </Suspense>
    )
  };
  const errorRoute500: RouteObject = {
    path: "errorPage500",
    element: (
      <Suspense fallback={<div>Loadig....</div>}>
        <Error500 />{" "}
      </Suspense>
    )
  };

  const router = useRoutes([
    // LoginRoutes,
    MainRoutes,
    errorRoute500,
    errorRoute403
  ]);
  return <Suspense fallback={<div>Loadig....</div>}>{router}</Suspense>;
};

export default AppRoutes;
