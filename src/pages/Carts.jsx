import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Carts.css';

function Carts({ carts, setCarts }) {
  const totalPrice = carts.reduce((prev, cart) => prev + cart.price, 0);

  return (
    <div className="carts-container">
      <div className="carts-items-container d-flex flex-wrap gap-4 justify-content-center">
        {carts.map((cart) => (
          <Card key={cart.id} style={{ width: '18rem' }} className="shadow-sm">
            <div className="d-flex justify-content-center mt-3">
              <Card.Img
                variant="top"
                src={cart.thumbnailUrl}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
            <Card.Body className="text-center">
              <Card.Title className="text-truncate">{cart.title}</Card.Title>
              <Card.Text>
                <b className="#">${cart.price.toFixed(2)}</b>
              </Card.Text>

              <Button
                variant="outline-danger"
                onClick={() =>
                  setCarts(carts.filter((item) => item.id !== cart.id))
                }
              >
                Remove From Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="text-center mt-4">
        <h4>
          Item <span class="badge text-bg-danger">{carts.length} ITEMS</span>  - 
          Total Price: <span class="badge text-bg-success">${totalPrice.toFixed(2)}</span>
        </h4>
        <Button variant="warning" className="mt-2">Checkout <i class="bi bi-wallet2"></i></Button>
      </div>
    </div>
  );
}

export default Carts;
