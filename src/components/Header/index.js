import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count">{cartItemsCount}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-bar">
      <Link to="/" className="cart-link-1">
        <h1 className="cafe-name">UNI Resto Cafe</h1>
      </Link>
      <div className="nav-items">
        <p className="my-orders">My Orders</p>
        <div className="cart-box">
          <Link to="/cart" className="cart-link">
            <button type="button" className="cart-btn" data-testid="cart">
              <AiOutlineShoppingCart className="cart-icon" />
            </button>
            <span>{renderCartItemsCount()}</span>
          </Link>
        </div>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <button
          type="button"
          className="nav-mobile-btn"
          onClick={onClickLogout}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="nav logout"
            className="nav-bar-img"
          />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
