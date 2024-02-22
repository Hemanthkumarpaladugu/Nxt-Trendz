import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const quantityUpdatedCartList = cartList.map(cartItem => {
      if (cartItem.id === id) {
        const {quantity} = cartItem
        const addOneItem = quantity + 1

        return {...cartItem, quantity: addOneItem}
      }
      return cartItem
    })

    this.setState({
      cartList: quantityUpdatedCartList,
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const quantityUpdatedCartList = cartList.map(cartItem => {
      if (cartItem.id === id) {
        const {quantity} = cartItem
        const decreaseOneItem = quantity - 1
        return {...cartItem, quantity: decreaseOneItem}
      }
      return cartItem
    })

    const quantityListWithNoZeroCartItems = quantityUpdatedCartList.filter(
      cartItem => cartItem.quantity > 0,
    )

    this.setState({
      cartList: quantityListWithNoZeroCartItems,
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const cartListOnRemoval = cartList.filter(cartItem => cartItem.id !== id)
    this.setState({cartList: cartListOnRemoval})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isPresent = cartList.find(cartItem => cartItem.id === product.id)

    if (isPresent === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const quantityUpdatedCartList = cartList.map(cartItem => {
        if (cartItem.id === product.id) {
          const addItems = cartItem.quantity + product.quantity
          return {...cartItem, quantity: addItems}
        }
        return cartItem
      })

      this.setState({
        cartList: quantityUpdatedCartList,
      })
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
