import React , { useState } from 'react'
import { Form , Button , Col } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSetps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) =>
{
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress)
    {
        history.push('/shipping')
    }

    const [paymentMethod , setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()

    const submitHandler = (e) =>
    {
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))

        history.push('/placeorder')
    }

    return (
            <FormContainer>
                <CheckoutSetps step1 step2 step3/>
                <h1>Payment Method</h1>

                <br />
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend' >Select Method</Form.Label>

                        <br /><br />

                        <Col>
                            <Form.Check type='radio' label='PayPal' id='PayPal'
                                        name='paymentMethod' value='PayPal' onChange={(e) => setPaymentMethod(e.target.value)} defaultChecked>
                            </Form.Check>

                            {/*<Form.Check type='radio' label='UPI' id='UPI'
                                        name='paymentMethod' value='UPI' onChange={(e) => setPaymentMethod(e.target.value)}>
                            </Form.Check>*/}
                        </Col>
                    </Form.Group>

                    <br />

                    <Button type='submit' variant='primary'>Continue</Button>
                </Form>
            </FormContainer>
           )
}

export default PaymentScreen
