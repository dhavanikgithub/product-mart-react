import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const ContactUsScreen = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})

	const { name, email, message } = formData

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// Handle form submission logic here
		console.log('Form data submitted: ', formData)
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
								required
							/>
						</Form.Group>

						<Form.Group controlId='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter your email'
								name='email'
								value={email}
								onChange={handleChange}
								required
							/>
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
								required
							/>
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
