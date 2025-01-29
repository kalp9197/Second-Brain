import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Home />
      </div>
    ),
  },
  {
    path: "/signin",
    element: (
      <div>
        <Header />
        <Signin />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Header />
        <Signup />
      </div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
