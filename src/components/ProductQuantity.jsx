import React from 'react';
import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap';

const ProductQuantity = ({ product, cartItems, setQty, qty }) => {
    const handleIncrement = () => {
        if (qty < product.countInStock) {
            setQty(qty + 1);
        }
    };

    const handleDecrement = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    return (
        <ListGroup.Item>
            <Row>
                <Col>Qty</Col>
                <Col className="d-flex align-items-center">
                    <Button
                        className='p-2'
                        variant="outline-primary"
                        onClick={handleDecrement}
                        disabled={qty <= 1}
                    >
                        <i className="fas fa-minus"></i>
                    </Button>
                    <Form.Control
                        type="text"
                        value={qty}
                        readOnly
                        className="mx-2 text-center text-primary p-2"
                        style={{ width: '50px' }}
                    />
                    <Button
                        className='p-2'
                        variant="outline-primary"
                        onClick={handleIncrement}
                        disabled={qty >= product.countInStock}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default ProductQuantity;
