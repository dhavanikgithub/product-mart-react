import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
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
	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	// useSelector is to grab what we want from the state
	const userLogin = useSelector((state) => state.userLogin);


	const redirect = location.search ? location.search.split('=')[1] : '/';

	// make request here upon component load
	useEffect(() => {
		if (userLogin.userInfo || userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect, userLogin]); // Dependencies, on change they fire off useEffect


	/**
	 * A function to validate an email address.
	 *
	 * @param {string} email - The email address to be validated.
	 * @return {string} An error message if the email is invalid, otherwise an empty string.
	 */
	const validateEmail = (email) => {
		// Email validation pattern
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			return 'Email is required';
		} else if (!pattern.test(email)) {
			return 'Invalid email format';
		}
		return '';
	};


	/**
	 * Validates a password based on certain criteria.
	 *
	 * @param {string} password - The password to be validated.
	 * @return {string} An empty string if the password is valid, or an error message if it is not.
	 */
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

	/**
	 * Validates the given name.
	 *
	 * @param {string} name - The name to validate.
	 * @return {string} An empty string if the name is valid, or an error message if it is not.
	 */
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

	useEffect(() => {
		// Scrolls the window
		window.scrollTo(0, 90);
	}, []);


	/**
	 * Handles the form submission for registering a new user.
	 *
	 * @param {Event} e - The event object representing the form submission.
	 * @return {void}
	 */
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
			{/* On error, display error */}
			{error && <Message variant='danger'>{error}</Message>}
			<Card className="rounded shadow border-0 scale-up-center">
				<h1 className="mb-4 bg-dark text-white rounded-top p-4">Sign Up</h1>
				{/* When loading, display Loading... */}
				{loading && <Loader />}
				<Form onSubmit={submitHandler} className='p-4'>
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
				<Row className='p-4'>
					<Col>
						Have an Account?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
							Login
						</Link>
					</Col>
				</Row>

			</Card>
		</FormContainer>
	);
};

export default RegisterScreen;
