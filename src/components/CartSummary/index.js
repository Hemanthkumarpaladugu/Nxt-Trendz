// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noOfTypeOfItems = cartList.length
      let totalAmount = 0
      cartList.forEach(cartItem => {
        totalAmount += cartItem.quantity * cartItem.price
      })
      return (
        <div className="cart-summary-container">
          <div className="order-details">
            <h1 className="bill">
              Order Total : <span className="amount">RS {totalAmount} /- </span>
            </h1>
            <p className="items-count">{noOfTypeOfItems} items in cart</p>
          </div>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
