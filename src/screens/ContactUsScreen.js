import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const ContactUsScreen = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [errors, setErrors] = useState({})

	const { name, email, message } = formData

	const validateName = (name) => {
		const pattern = /^[a-zA-Z\s'-]{3,50}$/
		if (!name) {
			return 'Name is required'
		} else if (name.length < 3) {
			return 'Name must be at least 3 characters long'
		} else if (name.length > 50) {
			return 'Name must be less than 50 characters long'
		} else if (!pattern.test(name)) {
			return 'Name can only contain letters, spaces, hyphens, and apostrophes'
		}
		return ''
	}

	const validateEmail = (email) => {
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!email) {
			return 'Email is required'
		} else if (!pattern.test(email)) {
			return 'Invalid email format'
		}
		return ''
	}

	const validateMessage = (message) => {
		const pattern = /^[a-zA-Z0-9\s.,?!'-]{1,500}$/
		if (!message) {
			return 'Message is required'
		} else if (message.length > 500) {
			return 'Message must be less than 500 characters long'
		} else if (!pattern.test(message)) {
			return 'Message contains invalid characters'
		}
		return ''
	}

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const nameError = validateName(name)
		const emailError = validateEmail(email)
		const messageError = validateMessage(message)

		if (nameError || emailError || messageError) {
			setErrors({
				name: nameError,
				email: emailError,
				message: messageError,
			})
		} else {
			// Handle form submission logic here
			console.log('Form data submitted: ', formData)
			setErrors({})
		}
	}

	return (
		<Container className='py-5'>
			<Row className='justify-content-md-center'>
				<Col md={6}>
					<h2 className='text-center mb-4'>Contact Us</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your name'
								name='name'
								value={name}
								onChange={handleChange}
								isInvalid={!!errors.name}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.name}
							</Form.Control.Feedback>
							<Form.Text className='text-muted'>
								Name must be 3-50 characters long and can only contain letters, spaces, hyphens, and apostrophes.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter your email'
								name='email'
								value={email}
								onChange={handleChange}
								isInvalid={!!errors.email}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.email}
							</Form.Control.Feedback>
							<Form.Text className='text-muted'>
								Enter a valid email address, e.g., name@example.com.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='message'>
							<Form.Label>Message</Form.Label>
							<Form.Control
								as='textarea'
								rows={5}
								placeholder='Enter your message'
								name='message'
								value={message}
								onChange={handleChange}
								isInvalid={!!errors.message}
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.message}
							</Form.Control.Feedback>
							<Form.Text className='text-muted'>
								Message must be less than 500 characters long and can contain letters, numbers, spaces, periods, commas, question marks, exclamation points, hyphens, and apostrophes.
							</Form.Text>
						</Form.Group>

						<Button variant='primary' type='submit' className='mt-3'>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default ContactUsScreen
