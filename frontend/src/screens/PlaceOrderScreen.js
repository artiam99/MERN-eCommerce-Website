import React , { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button , Row , Col , ListGroup , Image , Card } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSetps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { emptyCart } from '../actions/cartActions'

const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
}

const PlaceOrderScreen = ({ history }) =>
{
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const addDecimals = (num) =>
    {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

    const tax = 7
    
    cart.taxPrice = addDecimals(Number(((tax / 100) * cart.itemsPrice).toFixed(2)))
    
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))

    const orderCreate = useSelector(state => state.orderCreate)
    const { order , success , error } = orderCreate

    useEffect(() =>
    {
        if(success)
        {
            history.push(`/order/${order._id}`)

            dispatch(emptyCart())
        }
        // eslint-disable-next-line
      } , [history , success])

    const placeOrderHandler = () =>
    {
        dispatch(createOrder({ orderItems: cart.cartItems ,
                               shippingAddress: cart.shippingAddress ,
                               paymentMethod: cart.paymentMethod ,
                               itemsPrice: cart.itemsPrice,   
                               shippingPrice: cart.shippingPrice,   
                               taxPrice: cart.taxPrice,   
                               totalPrice: cart.totalPrice,   
                            }))
    }

    return (
            <div>
                <CheckoutSetps step1 step2 step3 step4 />
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address: </strong>
                                        {cart.shippingAddress.address} , {cart.shippingAddress.city} , {cart.shippingAddress.postalCode} , {cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {cart.paymentMethod}
                                </p>
                                
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? <Message>Your Cart is empty</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item , index) =>
                                        (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name}
                                                               style={{height:"auto" , width:"auto" , maxWidth: '70px', maxHeight: '70px'}} />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`} style={{color:'#101010' , textDecoration: 'none'}}>
                                                            <strong>{item.name}</strong>
                                                        </Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        <strong style={{fontSize: '13px'}}>
                                                            {item.qty} x ₹{format(item.price)} = ₹{format(item.qty * item.price)}
                                                        </strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>Order Summery</ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col><strong>₹{cart.itemsPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col><strong>₹{cart.shippingPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                            <strong>₹{cart.taxPrice} <span style={{fontSize: '10px'}}>({tax} %)</span></strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col><strong>₹{cart.totalPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                
                                <ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>

                                <ListGroup.Item>
                                    <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                            Place Order
                                    </Button>
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
           )
}

export default PlaceOrderScreen
