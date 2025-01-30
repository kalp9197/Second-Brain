import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SharedContent from "./pages/SharedContent";
import { AuthProvider } from "./context/AuthContext";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider> 
        <Header />
        <Home />
      </AuthProvider>
    ),
  },
  {
    path: "/signin",
    element: (
      <AuthProvider>
        <Header />
        <Signin />
      </AuthProvider>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthProvider>
        <Header />
        <Signup />
      </AuthProvider>
    ),
  },
  {
    path: "/shared/:shareLink",
    element: <SharedContent />,
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
