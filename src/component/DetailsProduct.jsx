import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const DetailsProduct = () => {
  const { id } = useParams();
  const [products, setProducts] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {products && (
        <Card
          style={{
            width: "25rem",
            margin: "auto",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          <Card.Img
            variant="top"
            src={products.thumbnail}
            alt={products.title}
          />
          <Card.Body>
            <Card.Title>{products.title}</Card.Title>
            <Card.Text>{products.category}</Card.Text>
            <Card.Text>{products.price}</Card.Text>
            <div className="row my-2 py-2">
              <Link to="/products">
                <Button variant="primary" className="p-3 w-50">
                  Back
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default DetailsProduct;
