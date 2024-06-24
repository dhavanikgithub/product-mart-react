import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Row className='align-items-center'>
				<Col md={4}>
					<Link to={`/product/${product._id}`}>
						{/* Product image */}
						<Card.Img src={product.image} variant='top' className='img-fluid' style={{ height: '150px', objectFit: 'contain' }} />
					</Link>
				</Col>
				<Col md={8}>
					<Card.Body className='d-flex flex-column'>
						<Link to={`/product/${product._id}`}>
							{/* Product name */}
							<Card.Title as='div' className='text-truncate' style={{ maxHeight: '3rem' }}>
								<strong>{product.name}</strong>
							</Card.Title>
						</Link>
						<Card.Text as='div'>
							{/* Product rating */}
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</Card.Text>
						{/* Product price */}
						<Card.Text as='h3' className='mt-auto'>₹ {product.price}</Card.Text>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	)
}

export default Product
