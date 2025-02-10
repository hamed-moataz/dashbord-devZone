import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCat, setEditCat] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchApi = async () => {
    try {
      const api = await axios.get("http://localhost:5000/products");
      setData(api.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setData(data.filter((item) => item.id !== id));
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  };
  // Open Edit Modal
  const openEditModal = (item) => {
    setEditItem(item);
    setEditTitle(item.title);
    setEditCat(item.category);
    setEditPrice(item.price);
    setShow(true);
  };
  const saveEdit = async () => {
    if (!editItem) return;

    try {
      await axios.put(`http://localhost:5000/products/${editItem.id}`, {
        title: editTitle,
        category: editCat,
        price: editPrice,
      });

      // تحديث البيانات بدون إعادة تحميل الصفحة
      setData(
        data.map((item) =>
          item.id === editItem.id
            ? { ...item, title: editTitle, category: editCat, price: editPrice }
            : item
        )
      );

      handleClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <Container>
      <Row className="row">
        {data.map((item) => (
          <Col xs lg="4" key={item.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.thumbnail} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.category}</Card.Text>
                <Card.Text>{item.price}</Card.Text>
                <div className="row my-2 py-2">
                  <Button variant="info" onClick={()=> navigate(`/products/${item.id}`)}>Viwe</Button>
                  <Button
                    variant="success"
                    onClick={() => {
                      openEditModal(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit </Modal.Title>
                  </Modal.Header>
                  <div className="p-4 text-center">
                    <p>Title</p>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <p>Category</p>
                    <input
                      type="text"
                      value={editCat}
                      onChange={(e) => setEditCat(e.target.value)}
                    />
                    <p>Price</p>
                    <input
                      type="text"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={saveEdit}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
