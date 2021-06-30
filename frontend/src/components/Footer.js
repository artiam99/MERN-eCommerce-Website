import React from 'react'
import { Container , Row , Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'><strong>Copyright &copy; ShoppiKart</strong></Col>
                </Row>
                <Row>
                    <Col className='text-center'><strong>Built by Debarshi Maitra (2021)</strong></Col>
                </Row> 
                <Row>
                    <Col className='text-center'><strong>Email - tuhin.dm1999@gmail.com</strong></Col>
                </Row> 
                <Row>
                    <Col className='text-center'><strong><a href='https://github.com/artiam99' target='blank'>Github</a></strong></Col>
                </Row> 
                <Row>
                    <Col className='text-center'>
                        <strong><a href='https://www.linkedin.com/in/debarshi-maitra-994932213/' target='blank'>Linkedin</a></strong>
                    </Col>
                </Row>                 
            </Container>
            Footer
        </footer>
    )
}

export default Footer
