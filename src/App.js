import React from 'react'
import data from './data.json'
import Products from './components/Products'
import Filter from './components/Filter'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			products: data.products,
			size: 'ALL',
			sortValue: ''
		}
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
							<Products products={this.state.products} />
						</div>
						<div className="sidebar">Cart Items</div>
					</div>
				</main>
				<footer>All right is reserved.</footer>
			</div>
		)
	}
}

export default App
