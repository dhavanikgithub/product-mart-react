import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});

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
	

	const validateEmail = (email) => {
		// Basic email validation pattern
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			return 'Email is required';
		} else if (!pattern.test(email)) {
			return 'Invalid email format';
		}
		return '';
	};

	const validatePassword = (password) => {
		// Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character
		const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!password) {
			return 'Password is required';
		} else if (!pattern.test(password)) {
			return 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character';
		}
		return '';
	};

	const validateName = (name) => {
		if (!name) {
			return 'Name is required';
		} else if (name.length < 3) {
			return 'Name must be at least 3 characters long';
		} else if (name.length > 50) {
			return 'Name must be less than 50 characters long';
		}
		return '';
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const nameError = validateName(name);
		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);
		const confirmPasswordError = password !== confirmPassword ? 'Passwords do not match' : '';

		if (nameError || emailError || passwordError || confirmPasswordError) {
			setErrors({
				name: nameError,
				email: emailError,
				password: passwordError,
				confirmPassword: confirmPasswordError,
			});
		} else {
			setErrors({});
			// Dispatch register
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1 className="mb-4">Sign Up</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group className="mb-3" controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						isInvalid={!!errors.name}
						maxLength={50}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.name}
					</Form.Control.Feedback>
					<Form.Text className='text-muted'>
						Name must be at least 3 characters long and less than 50 characters.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						isInvalid={!!errors.email}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.email}
					</Form.Control.Feedback>
					<Form.Text className='text-muted'>
						Enter a valid email address, e.g., name@example.com.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						isInvalid={!!errors.password}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.password}
					</Form.Control.Feedback>
					<Form.Text className='text-muted'>
						Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						isInvalid={!!errors.confirmPassword}
					/>
					<Form.Control.Feedback type='invalid'>
						{errors.confirmPassword}
					</Form.Control.Feedback>
					<Form.Text className='text-muted'>
						Please confirm your password.
					</Form.Text>
				</Form.Group>

				<Button type='submit' variant='primary' className="mt-3">
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Have an Account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
