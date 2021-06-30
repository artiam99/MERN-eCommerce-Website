import React , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row , Col , ListGroup , Image , Card , Button } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails , payOrder , deliverOrder , listMyOrders } from '../actions/orderActions'
import axios from 'axios'
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { PayPalButton } from 'react-paypal-button-v2'

const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
}

const OrderScreen = ({ match , history }) =>
{
    const orderId = match.params.id

    const [sdkReady , setSdkReady] = useState(false)
    const [currency , setCurrency] = useState(0)
    const [usd , setUsd] = useState(0)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order , loading , error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay , success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver , success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const tax = 7

    if(!loading && order && order.orderItems)
    {
        const addDecimals = (num) =>
        {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() =>
    {
        const func = async () =>
        {
            fetch(`http://data.fixer.io/api/latest?access_key=00cf9e6bfdb9e9cdb2faaa66a0251816`)
            .then(response => response.json())
            .then(data =>
            {
                setCurrency(Number(data.rates.USD / data.rates.INR))
            })
            .catch((error) =>
            {
                setCurrency(1)
            });  
        }

        func()

    } , [])

    useEffect(() =>
    {
        const addPayPalScript = async () =>
        {
            const { data: ClientId } = await axios.get('/api/config/paypal')

            const script = document.createElement('script')

            script.type = 'text/javascript'

            script.src = `https://www.paypal.com/sdk/js?client-id=${ClientId}`

            script.async = true

            script.onload = () =>
            {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }

        if(order)
        {
            setUsd((currency * order.totalPrice).toFixed(2))
        }

        if(!order || successPay || successDeliver)
        {
            dispatch({ type: ORDER_PAY_RESET })
            
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(orderId))

            dispatch(listMyOrders())
        }
        else if(!order.isPaid)
        {
            if(!window.paypal)
            {
                addPayPalScript()
            }
            else
            {
                setSdkReady(true)
            }
        }

        if(!userInfo)
        {
            history.push('/login')
        }

    } , [dispatch , orderId , successPay , successDeliver , order , history , userInfo , currency])

    const successPaymentHandler = (paymentResult) =>
    {
        dispatch(payOrder(orderId , paymentResult))
    }

    const deliverHandler = () =>
    {
        dispatch(deliverOrder(order))
    }

    return (loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <div>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p>
                                    <strong>Address: </strong>
                                        {order.shippingAddress.address} , {order.shippingAddress.city} , {order.shippingAddress.postalCode} , {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (<Message variant='success'>Delivered on {order.deliveredAt}</Message>) :
                                                (<Message variant='danger'>Not Delivered</Message>)}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}</Message>) :
                                                (<Message variant='danger'>Not Paid</Message>)}
                                
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item , index) =>
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
                                        <Col><strong>₹{order.itemsPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col><strong>₹{order.shippingPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>
                                            <strong>₹{order.taxPrice} <span style={{fontSize: '10px'}}>({tax} %)</span></strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col><strong>₹{order.totalPrice}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid &&
                                    (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> :
                                            (
                                                <PayPalButton amount={usd} onSuccess={successPaymentHandler} />
                                            )}
                                        </ListGroup.Item>
                                    )}

                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&
                                    (
                                        <ListGroup.Item>
                                            <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
           )
}

export default OrderScreen
