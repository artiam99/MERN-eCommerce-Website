import React , { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { Row , Col , ListGroup , Image , Form , Button , Card } from 'react-bootstrap'
import { addToCart , emptyCart, removeFromCart } from '../actions/cartActions'

const format = num => {
    const n = String(num),
          p = n.indexOf('.')
    return n.replace(
        /\d(?=(?:\d{3})+(?:\.|$))/g,
        (m, i) => p < 0 || i < p ? `${m},` : m
    )
}

const CartScreen = ({ match , location , history}) =>
{
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
  
    const dispatch = useDispatch()
  
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    useEffect(() =>
    {
        if (!userInfo)
        {
            dispatch(emptyCart())

            history.push('/login')
        }

        if(productId)
        {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch , productId , qty , userInfo , history])
  

    const removeFromCartHandler = (id) =>
    {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>
    {
        history.push('/login?redirect=shipping')
    }

    return (
        <div>
            <h1>SHOPPING CART</h1>
            {cartItems.length === 0 ?
            (<div><Link className='btn btn-light my-3' to='/'>Go Back</Link>
                <div style={{textAlign: 'center' , fontSize: '40px' , color: '#cfd0be'}}><strong>EMPTY CART</strong></div>
                <div style={{textAlign: 'center'}}>
                    <img alt='empty_cart' src='/Empty_Cart.png' style={{height: 'auto' , width: 'auto' , maxWidth: '400px' , maxHeight: '400px' , opacity: '0.4'}}/>
                </div>
            </div>
            ) :
            (
            <Row>
                <Col md={8}>
                <ListGroup variant='flush'>
                    {cartItems.map((item) =>
                    (<ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} style={{height:"auto" , width:"auto" , maxWidth:"130px" , maxHeight:"130px"}}/>
                            </Col>
                            <Col md={4}>
                            <Link to={`/product/${item.product}`} style={{color:'#101010' , textDecoration: 'none' , fontSize: '20px'}}>
                                <strong>{item.name}</strong>
                            </Link>
                            </Col>
                            <Col md={2}><strong style={{fontSize: '20px'}}>₹{format(item.price)}</strong></Col>
                            <Col md={2}>
                                <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                {[...Array(Math.min(item.countInStock,10)).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                     </ListGroup.Item>))}
                </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                    <span style={{fontSize: '30px'}}>
                                         Price Details
                                    </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <span style={{fontSize: '20px'}}>
                                            Total ({cartItems.reduce((acc , item) => acc += item.qty , 0)} {cartItems.reduce((acc , item) => acc += item.qty , 0) > 1 ? 'Items' : 'Item'})
                                        </span>
                                    </Col>
                                    <Col>
                                        <strong style={{fontSize: '20px'}}>
                                            ₹{format(cartItems.reduce((acc , item) => acc += item.qty * item.price , 0).toFixed(2))}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>)}
        </div>
    )
}

export default CartScreen
