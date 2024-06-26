import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import '../index.css'

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 px-5 my-font">
            <Container fluid>
                <Row>
                    <Col className='text-center py-3'>
                        <h5>Product Mart</h5>
                        <Nav className="justify-content-center">
                            <Nav.Item>
                                <Nav.Link href="/" className="text-white">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contact" className="text-white">Contact Us</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/cart" className="text-white">Cart</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/login" className="text-white">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/register" className="text-white">Register</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center py-3'>
                        &copy; {new Date().getFullYear()} Product Mart. All Rights Reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
