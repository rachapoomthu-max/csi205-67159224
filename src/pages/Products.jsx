import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css';

function Products({ products, carts, setCarts }) {
  return (
    <div className="products-container">
      <div className="products-items-container d-flex flex-wrap gap-4 justify-content-center">
        {products.map((product) => {
          const isInCart = carts.find((cart) => cart.id === product.id);

          return (
            <Card key={product.id} style={{ width: '18rem' }} className="shadow-sm">
              <div className="d-flex justify-content-center mt-3">
                <Card.Img
                  variant="top"
                  src={product.thumbnailUrl}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text>
                  <b className="#">${product.price.toFixed(2)}</b>
                </Card.Text>

                {isInCart ? (
                  <span className="badge bg-danger">Added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => setCarts([...carts, product])}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
