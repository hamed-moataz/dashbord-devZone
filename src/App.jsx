import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import DetailsProduct from "./component/DetailsProduct";
import Header from "./component/Header";

const App = () => {
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/products" element={<Home />} />
          <Route path="/products/:id" element={<DetailsProduct />} />
        </Routes>
    </div>
  );
};

export default App;
