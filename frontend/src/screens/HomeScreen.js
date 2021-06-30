import React , { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { Row , Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) =>
{
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    // Redux

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading , error , products , page , pages } = productList

    useEffect(() =>
    {
        dispatch(listProducts(keyword , pageNumber))

    } , [dispatch , keyword , pageNumber])


    // Hooks

    // const [products , setProducts] = useState([])

    // useEffect(() =>
    // {
    //     const fetchProducts = async () =>
    //     {
    //         const { data } = await axios.get('/api/products')

    //         setProducts(data)
    //     }

    //     fetchProducts()

    // }, [])

    return (
        <div>
            <Meta />
            
            {!keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light'>Go Back</Link>)}

            <h1>LATEST PRODUCTS</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            (<div>
                <Row>
                {products.map(product =>
                    (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>

                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </div>)}

        </div>
    )
}

export default HomeScreen
