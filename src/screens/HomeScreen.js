import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    // useSelector to grab product list state
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    // Fetch products upon component mount
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            <h1>Products</h1>

            {/* Display loading spinner, error message, or products */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    {/* Display products in multiple columns */}
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    <Paginate  pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    )
}

export default HomeScreen
