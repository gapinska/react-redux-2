import React from 'react'
import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter'
import Cart from './components/Cart'
import store from './store'
import { Provider } from 'react-redux'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			products: data.products,
			cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
			size: 'ALL',
			sortValue: ''
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

	sortProducts = (event) => {
		const sortValue = event.target.value

		this.setState({
			sortValue,
			products: this.state.products.sort(
				(item1, item2) =>
					sortValue === 'lowest'
						? item1.price > item2.price ? 1 : -1
						: sortValue === 'highest' ? (item1.price < item2.price ? 1 : -1) : item1.id < item2.id ? 1 : -1
			)
		})
	}

	filterProducts = (event) => {
		if (event.target.value === 'ALL') {
			this.setState({
				size: 'ALL',
				products: data.products
			})
		} else {
			const products = data.products.filter((product) => product.availableSizes.includes(event.target.value))
			this.setState({
				size: event.target.value,
				products
			})
		}
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
								<Filter
									count={this.state.products.length}
									size={this.state.size}
									sortValue={this.state.sortValue}
									filterProducts={this.filterProducts}
									sortProducts={this.sortProducts}
								/>
								<Products addToCart={this.addToCart} products={this.state.products} />
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
