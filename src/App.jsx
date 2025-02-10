import { Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import DetailsProduct from "./component/DetailsProduct";

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/products" element={<Home />} />
          <Route path="/products/:id" element={<DetailsProduct />} />
        </Routes>
    </div>
  );
};

export default App;
