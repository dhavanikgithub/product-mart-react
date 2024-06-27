import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { removeFromCart, addToCart } from '../actions/cartActions'

const CartScreen = ({ history }) => {

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const cart = useSelector((state) => state.cart)
	let { cartItems } = cart


	// Add two decimals to price if needed
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}
	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
	}

	const incrementQty = (item) => {
		if (item.qty < item.countInStock) {
			dispatch(addToCart(item.product, item.qty + 1))
		}
	}

	const decrementQty = (item) => {
		if (item.qty > 1) {
			dispatch(addToCart(item.product, item.qty - 1))
		}
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => {
							return (

								<ListGroup.Item key={item.product} className={`my-3 py-2 scale-up-center`}>
									<Row>
										<Col className='col-md-2 col-lg-2 col-sm-1 col-1'>
											<Link to={`/product/${item.product._id}`}>
												<Image src={item.image} alt={item.name} fluid rounded width={'100%'} />
											</Link>
										</Col>
										<Col className='col-md-3 col-lg-4'>
											<Link to={`/product/${item.product._id}`}>{item.name}</Link>
											<Card.Text className='mt-2'>₹ {item.price}</Card.Text>
										</Col>
										<Col className='col-md-3 col-lg-4 my-sm-2 my-md-0 my-lg-0 my-2 col'>
											<Button
												className='p-2'
												variant="outline-primary"
												onClick={() => decrementQty(item)}
												disabled={item.qty <= 1}
											>
												<i className="fas fa-minus"></i>
											</Button>
											<span className="mx-2">{item.qty}</span>
											<Button
												className='p-2'
												variant="outline-primary"
												onClick={() => incrementQty(item)}
												disabled={item.qty >= item.countInStock}
											>
												<i className="fas fa-plus"></i>
											</Button>

										</Col>
										<Col className='my-sm-2 my-md-0 my-lg-0 my-2 col-md-2'>
											<Button
												type='button'
												variant='dark'
												onClick={() => removeFromCartHandler(item.product)}
											>
												<i className='fas fa-trash text-white'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							)
						})}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							<span className='push-to-right'>
								₹ {addDecimals(
									cartItems
										.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)
								)}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
