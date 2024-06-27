import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';


const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	// useSelector is to grab what we want from the state
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	// make request here upon component load
	useEffect(() => {
		if (userInfo) {

			history.push(redirect);
		}
	}, [history, userInfo, redirect]); // Dependencies, on change they fire off useEffect

	const submitHandler = (e) => {
		e.preventDefault();
		// Dispatch login
		dispatch(login(email, password));
	};

	return (
		<FormContainer>
			{/* On error, display error */}
			{error && <Message variant="danger">{error}</Message>}
			<Card className="rounded shadow border-0">
				<h1 className="mb-4 bg-dark text-white rounded-top p-4">Sign In</h1>
				{/* When loading, display Loading... */}
				{loading && <Loader />}
				<Form onSubmit={submitHandler} className='p-4'>
					{/* Email */}
					<Form.Group controlId="email" className="mb-3">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Form.Text className='text-muted'>
							Enter a valid email address, e.g., name@example.com.
						</Form.Text>
					</Form.Group>
					{/* Password */}
					<Form.Group controlId="password" className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Form.Group>
					{/* Button */}
					<Button type="submit" variant="primary" className="w-100 mb-3">
						Sign In
					</Button>
				</Form>
				{/* Register */}
				<Row className="p-4">
					<Col>
						New Customer?{' '}
						<Link
							to={redirect ? `/register?redirect=${redirect}` : '/register'}
							className="text-decoration-none"
						>
							Register
						</Link>
					</Col>
				</Row>
			</Card>
		</FormContainer>
	);
};

export default LoginScreen;
