import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
	listProductDetails,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { addToCart, removeFromCart } from '../actions/cartActions';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1)

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails


	// For cart
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	// For product review
	const productReviewCreate = useSelector((state) => state.productReviewCreate)
	const {
		success: successProductReview,
	} = productReviewCreate

	// make request here upon component load
	useEffect(
		() => {
			if (successProductReview) {
				dispatch(listProductDetails(match.params.id))
				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
			}
			// Fire off action to get a single product
			if (!product._id || product._id !== match.params.id) {
				dispatch(listProductDetails(match.params.id))
				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
			}
		},
		[dispatch, match, successProductReview, product._id] // Dependencies, on change they fire off useEffect
	)

	// Add to cart handler
	const addToCartHandler = () => {
		dispatch(addToCart(match.params.id, qty))
	}

	// Remove from cart handler
	const removeFromCartHandler = () => {
		dispatch(removeFromCart(product._id));
	};

	return (
		<>
			{/* Back button */}
			<Link className='btn btn-light my-3' to='/'>
				<i className='fas fa-arrow-left'></i>
			</Link>
			{/* When loading, display Loading...
            On error, display error
            Else display the product details */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						{/* Product image */}
						<Col md='2'>
							<Image src={product.image} alt={product.name} fluid width={'100%'}/>
						</Col>
						<Col md='1'>
						</Col>
						<Col md='4'>
							{/* Product name */}
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								{/* Product rating */}
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
										color={'#333333'}
									/>
								</ListGroup.Item>
								{/* Product price */}
								<ListGroup.Item>Price: ₹ {product.price}</ListGroup.Item>
								{/* Product description */}
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
							</ListGroup>
							<Card className='mt-4 bg-dark'>
								<ListGroup variant='flush' className='bg-dark'>
									<ListGroup.Item className='bg-dark text-white'>
										{/* Product price */}
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>₹ {product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									{/* Product status */}
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{/* Quantity of stock */}
									{product.countInStock > 0 && (
										cartItems.some((item) => item.product === product._id) ? (null) : (
											// Only show if product is in stock
											<ListGroup.Item>
												<Row>
													<Col>Qty</Col>
													<Col>
														<Form.Control
															as='select'
															value={qty}
															onChange={(e) => setQty(e.target.value)}
														>
															{/* Getting countInStock keys */}
															{[...Array(product.countInStock).keys()].map(
																(x) => (
																	<option key={x + 1} value={x + 1}>
																		{x + 1}
																	</option>
																)
															)}
														</Form.Control>
													</Col>
												</Row>
											</ListGroup.Item>
										)

									)}

									<ListGroup.Item >
										{cartItems.some((item) => item.product === product._id) ? (
											// Show "Added to Cart" message if product is in cart
											<Button
												onClick={removeFromCartHandler}
												className='btn btn-secondary'
												type='button'
												disabled={true}
											>
												Added to Cart
											</Button>
										) : product.countInStock > 0 ? (
											// Add to cart button
											<Button
												onClick={addToCartHandler}
												className='btn-block'
												type='button'
											>
												<span className='plus-sign-margin'>
													<i className='fas fa-shopping-cart'></i>
												</span>
												Add To Cart
											</Button>
										) : (
											// Sold Out button
											<Button
												className='btn-block'
												type='button'
												disabled={product.countInStock === 0}
											>
												Sold Out
											</Button>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					
				</>
			)}
		</>
	)
}

export default ProductScreen
