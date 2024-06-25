import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import Message from '../components/Message'

const ShippingScreen = ({ history }) => {
	// useSelector is to grab the cart from the state
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()

	const validateInput = (input) => {
		const pattern = /^[a-zA-Z0-9,'-]*$/
		return pattern.test(input)
	}

	const validatePostalCode = (postalCode) => {
		const pattern = /^[1-9][0-9]{5}$/
		return pattern.test(postalCode)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		if (!address) {
			setMessage('Address is required')
		} else if (!validateInput(address)) {
			setMessage('Invalid characters in address')
		} else if (!city) {
			setMessage('City is required')
		} else if (!validateInput(city)) {
			setMessage('Invalid characters in city')
		} else if (!postalCode) {
			setMessage('Postal code is required')
		} else if (!validatePostalCode(postalCode)) {
			setMessage('Invalid Indian postal code format')
		} else if (!country) {
			setMessage('Country is required')
		} else if (!validateInput(country)) {
			setMessage('Invalid characters in country')
		} else {
			setMessage(null)
			dispatch(saveShippingAddress({ address, city, postalCode, country }))
			history.push('/payment')
		}
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			{message && <Message variant='danger'>{message}</Message>}
			<Form onSubmit={submitHandler}>
				{/* Address */}
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
					<Form.Text className='text-muted'>
						Address can contain letters, numbers, commas, apostrophes, and hyphens.
					</Form.Text>
				</Form.Group>
				{/* City */}
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
					<Form.Text className='text-muted'>
						City can contain letters, numbers, commas, apostrophes, and hyphens.
					</Form.Text>
				</Form.Group>
				{/* Postal Code */}
				<Form.Group controlId='postalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter postal code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
					<Form.Text className='text-muted'>
						Postal code should be a 6-digit number as per Indian postal code system.
					</Form.Text>
				</Form.Group>
				{/* Country */}
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
					<Form.Text className='text-muted'>
						Country can contain letters, numbers, commas, apostrophes, and hyphens.
					</Form.Text>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
