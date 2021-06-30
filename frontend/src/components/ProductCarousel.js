import React , { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel , Image } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
}

const ProductCarousel = () =>
{
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading , error , products } = productTopRated

    useEffect(() =>
    {
        dispatch(listTopProducts())

    } , [dispatch])

    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) :
    (
        <Carousel pause='hover' className='bg-dark'>
            {products.map((product) =>
            (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    
                    <Carousel.Caption className='carousel-caption'>

                    <h2>{product.name}  (₹{format(product.price)})</h2>
                
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel