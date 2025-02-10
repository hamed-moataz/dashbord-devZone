import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
    const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const sendData =async (e) => {
    e.preventDefault();
    if (title == "") {
        alert("please enter the title");
        return;
      }
      if (category == "") {
        alert("please enter the category");
        return;
      }
      if (price <= 0) {
        alert("please enter the price");
        return;
      }
  try {
    await axios.post("http://localhost:5000/products", {
        title: title,
        category: category,
        price: price,
        thumbnail: thumbnail,
      });
      Swal.fire({
        title: "Good job!",
        text: "Product added successfully!",
        icon: "success",
      });

      setTitle("");
      setCategory("");
      setPrice(0);
      setThumbnail(null);

      navigate("/products");

  } catch (error) {
    console.log(error)
  }
    
  };
  return (
    <div className="container">
      <h1 className="text-center my-4">AddProduct</h1>
      <form onSubmit={sendData}>
        <div className="form-group ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label htmlFor="image">image url</label>
          <input
            type="text"
            className="form-control"
            id="image"
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3 w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
