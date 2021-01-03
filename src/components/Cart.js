import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'

class Cart extends Component {
	state = {
		showCheckout: false,
		name: '',
		email: '',
		address: ''
	}

	showCheckout = () => {
		this.setState({
			showCheckout: true
		})
	}

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	createOrder = (e) => {
		e.preventDefault()
		const order = {
			name: this.state.name,
			email: this.state.email,
			address: this.state.address,
			cartItems: this.props.cartItems
		}
		this.props.createOrder(order)
	}
	render() {
		const { cartItems } = this.props
		let count = 0
		//let totalPrice = 0
		cartItems.forEach((item) => {
			count += item.count
			//totalPrice += item.count * item.price
		})

		const totalPrice = formatCurrency(cartItems.reduce((acc, item) => acc + item.count * item.price, 0))

		return (
			<div>
				{cartItems.length === 0 ? (
					<div className="cart cart-header">Cart is empty</div>
				) : (
					<div>
						<div className="cart cart-header">You have {count} items in the cart</div>
						<Fade left cascade>
							<ul className="cartItems">
								{cartItems.map((item) => (
									<li className="cartItem">
										<img src={item.image} alt={item.title} />
										<div className="item-description">
											<p>{item.title}</p>
											<div className="item-details">
												<p>
													{item.count}X {formatCurrency(item.price)}
												</p>
												<button
													className="remove-item"
													onClick={() => this.props.removeFromCart(item)}
												>
													Remove
												</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						</Fade>

						<div className="cart-summary">
							<div>Total: {totalPrice}</div>
							<button onClick={this.showCheckout}>Proceed</button>
						</div>
						{this.state.showCheckout && (
							<Fade right cascade>
								<div>
									<form onSubmit={this.createOrder}>
										<ul className="form-container">
											<li>
												<label>Email</label>
												<input name="email" type="email" required onChange={this.handleInput} />
											</li>
											<li>
												<label>Name</label>
												<input name="name" type="text" required onChange={this.handleInput} />
											</li>
											<li>
												<label>Address</label>
												<input
													name="address"
													type="text"
													required
													onChange={this.handleInput}
												/>
											</li>
											<li>
												<button classsName="button primary" type="submit">
													Checkout
												</button>
											</li>
										</ul>
									</form>
								</div>
							</Fade>
						)}
					</div>
				)}
			</div>
		)
	}
}

export default Cart
