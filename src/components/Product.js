import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, OverlayTrigger , Tooltip } from 'react-bootstrap'
import Rating from './Rating'
import '../index.css'

const Product = ({ product }) => {
	return (
		<Card className='my-3 rounded product-card'>
			<Row className='align-items-center'>
				<Col md={4} className=''>
					<Link to={`/product/${product._id}`} className="text-decoration-none ">
						{/* Product image */}
						<Card.Img src={product.image} variant='top' className='img-fluid p-3' style={{ height: '150px', objectFit: 'contain' }} />
					</Link>
				</Col>
				<Col md={8} >
					<Card.Body className='d-flex flex-column'>
						<Link to={`/product/${product._id}`} className="text-decoration-none">
							{/* Product name */}
							<OverlayTrigger
							placement="top"
							overlay={<Tooltip id={`tooltip-${product.name}`}>{product.name}</Tooltip>}
							>
								<Card.Title as='div' className='text-truncate' style={{ maxHeight: '2.5rem' }}>
									<strong>{product.name}</strong>
								</Card.Title>
							</OverlayTrigger>
						</Link>
						<Card.Text as='div'>
							{/* Product rating */}
							<Rating
								value={product.rating}
								color={'#333333'}
							/>
						</Card.Text>
						<Card.Text as='div'>
							{/* Product number of reviews */}
							{product.numReviews} reviews
						</Card.Text>
						{/* Product price */}
						<Card.Text as='h5' className='mt-3'>₹ {product.price}</Card.Text>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	)
}

export default Product
