import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import RouteLayout from "./layout/RouteLayout";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        }, 
        {
          path: "/:id",
          element:<Details/>
        }
      ],
    },

  ]);
  return <RouterProvider router={routes} />;
}

export default App;
