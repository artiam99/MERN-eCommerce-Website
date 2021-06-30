import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar , Nav , Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () =>
{
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () =>
    {
        dispatch(logout())
    }

    return (
        <header>
          <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: '#4d6684'}}>
            <Container>
              <LinkContainer to='/'>
              <Navbar.Brand><img src='/ShoppiKart.png' alt='ShoppiKart' width='150px' height='40px'/></Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Route render={({history}) => <SearchBox history={history}/>} />
                <Nav className="me-auto">
                </Nav>
                <Nav>
                  <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link></LinkContainer>
                  { (userInfo) ?
                    (<NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>)
                    :<LinkContainer to='/login'><Nav.Link><i className='fas fa-user'></i> Sign in</Nav.Link></LinkContainer>}

                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title='Admin' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar> 
        </header>
    )
}

export default Header
