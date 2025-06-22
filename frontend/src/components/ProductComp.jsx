import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const ProductComp = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img className="card_img" src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link className="prod-title-decor" to={`/products/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">₹ {product.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductComp;
