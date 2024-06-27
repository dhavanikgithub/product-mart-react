import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import '../index.css'

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Access cart state
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    // Calculate total items in cart
    const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='text-uppercase px-5 my-font'>
                <Container fluid>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            Product Mart
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav ' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/'>
                                <Nav.Link className='text-white text-normal-case'>
                                    Home
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/contact'>
                                <Nav.Link className='text-white text-normal-case'>
                                    Contact
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link className='text-white position-relative'>
                                    <i className='fas fa-shopping-cart'></i>
                                    {totalItemsInCart > 0 && (
                                        <Badge pill bg='info' className='position-absolute top-5 start-100 translate-middle'>
                                            
                                            {totalItemsInCart}
                                            <span className='visually-hidden'>unread messages</span>
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' className='text-normal-case'>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link className='ms-3'>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
