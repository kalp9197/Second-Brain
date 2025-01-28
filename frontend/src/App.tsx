import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <div className="m-17">
        <Header />
      </div>
      <Home />
    </div>
  );
};

export default App;
