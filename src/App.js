import React from 'react'
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
		}
	}

	createOrder = (order) => {
		alert('need to save the order of  ' + order.name)
	}

	addToCart = (product) => {
		const cartItems = this.state.cartItems.slice()
		let alreadyInCart = false
		cartItems.forEach((item) => {
			if (item.id === product.id) {
				item.count++
				alreadyInCart = true
			}
		})
		if (!alreadyInCart) {
			cartItems.push({ ...product, count: 1 })
		}
		this.setState({
			cartItems
		})
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}

	removeFromCart = (product) => {
		const cartItems = this.state.cartItems.filter((item) => item.id !== product.id)
		this.setState({
			cartItems
		})
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}

	render() {
		return (
			<Provider store={store}>
				<div className="grid-container">
					<header>
						<a href="/">React Shopping Cart</a>
					</header>
					<main>
						<div className="content">
							<div className="main">
								<Filter />
								<Products addToCart={this.addToCart} />
							</div>
							<div className="sidebar">
								<Cart
									cartItems={this.state.cartItems}
									removeFromCart={this.removeFromCart}
									createOrder={this.createOrder}
								/>
							</div>
						</div>
					</main>
					<footer>All right is reserved.</footer>
				</div>
			</Provider>
		)
	}
}

export default App
