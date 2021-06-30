import React , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { Row , Col , Image , ListGroup , Card , Button , Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import CustomerRating from '../components/CustomerRating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails , createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { listMyOrders } from '../actions/orderActions'
import Meta from '../components/Meta'

const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
}

const ProductScreen = ({ history , match }) => 
{
    const [qty , setQty] = useState(1)
    const [rating , setRating] = useState(0)
    const [comment , setComment] = useState('')
    const [isOrdered , setIsOrdered] = useState(false)

    // Redux

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading , error , product } = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview , error: errorProductReview , success: successProductReview } = productReviewCreate

    const orderListMy = useSelector(state => state.orderListMy)
    const { orders } = orderListMy

    useEffect(() =>
    {
        if(successProductReview)
        {
            setRating(0)

            setComment('')
        }

        if(!product._id || product._id !== match.params.id)
        {
            dispatch(listProductDetails(match.params.id))
            
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })

            if(userInfo)
            {
                dispatch(listMyOrders())
            }
        }

        if(orders)
        {
            let found = false

            orders.forEach(order =>
            {
                if(order.isDelivered)
                {
                    order.orderItems.forEach(Item =>
                    {
                        if(Item.product === product._id)
                        {
                            found = true
                        }
                    })    
                }
            })

            if(found)
            {
                setIsOrdered(true)
            }
            else
            {
                setIsOrdered(false)
            }
        }

      }, [dispatch , match , successProductReview , userInfo , orders , isOrdered , product])

    const addToCartHandler = () =>
    {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) =>
    {
        e.preventDefault()

        dispatch(createProductReview(match.params.id , { rating , comment }))
    }


    // Hooks

    // const [product , setProduct] = useState([])

    // useEffect(() =>
    // {
    //     const fetchProduct = async () =>
    //     {
    //         const { data } = await axios.get(`/api/products/${match.params.id}`)

    //         setProduct(data)
    //     }

    //     fetchProduct()

    // }, [match])

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            (<div>
            <Meta title={product.name} />
            <Row>
                <Col md={3}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={5}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <strong style={{fontSize: '25px'}}>{product.name}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item style={{fontSize:'20px'}}>
                            Price: <span style={{fontWeight: 'bold'}}>₹{format(product.price)}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span style={{fontSize:'20px'}}>Description:</span><div style={{whiteSpace: 'pre-line'}}>{product.description}</div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row><Col>Price:</Col><Col><strong>₹{format(product.price)}</strong></Col></Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col style={product.countInStock > 3 ? {color: '#228B22'} : {color: '#db0000'}}>
                                        {product.countInStock > 3 ? 'In Stock' : product.countInStock > 0 ? `Hurry, Only ${product.countInStock} left!` : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 &&
                            (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>QTY</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(Math.min(product.countInStock , 10)).keys()].map(x =>
                                                    (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className="btn-block" type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
            <br/><br/>

            <Row>
                <Col md={6}>
                    <h2>
                        <strong>
                            Reviews <span></span>
                            <span style={{color: 'Gray' , fontSize: '15px'}}>
                                ({product.numReviews > 0 ? <span>{product.numReviews} </span> : <span>No </span>}
                                {product.numReviews === 1 ? <span>review</span> : <span>reviews</span>})
                            </span>
                        </strong>
                    </h2>
                    <ListGroup variant='flush'>
                        {product.reviews.map(review =>
                        (<ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong><CustomerRating rating={review.rating}/>
                            <p>{review.createdAt && review.createdAt.substring(0 , 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>))}
                        {userInfo && isOrdered &&
                        (errorProductReview ? <Message variant='danger'>{errorProductReview}</Message> :
                        (<ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value=''>Select...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                  </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='comment'>
                                  <Form.Label>Comment</Form.Label>
                                  <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>
                                  </Form.Control>
                                </Form.Group>

                                <br/>
                                
                                <Button disabled={loadingProductReview} type='submit' variant='primary'>Submit</Button>
                            </Form>
                        </ListGroup.Item>))}
                    </ListGroup>
                </Col>
            </Row>
            </div>)}
        </div>
    )
}

export default ProductScreen
