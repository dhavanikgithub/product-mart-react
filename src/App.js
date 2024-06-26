import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ContactUsScreen from './screens/ContactUsScreen'
import './index.css'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='px-5 py-3 my-font'>
				<Container fluid>
					{/* LoginScreen */}
					<Route path='/login' component={LoginScreen} />
					{/* RegisterScreen */}
					<Route path='/register' component={RegisterScreen} />
					{/* ShippingScreen */}
					<Route path='/shipping' component={ShippingScreen} />
					{/* PaymentScreen */}
					<Route path='/payment' component={PaymentScreen} />
					{/* PlaceOrderScreen */}
					<Route path='/placeorder' component={PlaceOrderScreen} />
					{/* OrderScreen */}
					<Route path='/order/:id' component={OrderScreen} />
					{/* ProductScreen */}
					<Route path='/product/:id' component={ProductScreen} />
					{/* ContactUsScreen */}
					<Route path='/contact' component={ContactUsScreen} />
					{/* CartScreen */}
					<Route path='/cart/:id?' component={CartScreen} />
					{/* HomeScreen Search */}
					<Route path='/search/:keyword' component={HomeScreen} exact />
					{/* HomeScreen Search Page number */}
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
						exact
					/>
					{/* HomeScreen Page number */}
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					{/* HomeScreen */}
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
