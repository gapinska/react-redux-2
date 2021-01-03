import React, { Component } from 'react'
import formatCurrency from '../util'

class Cart extends Component {
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
						<div>Total: {totalPrice}</div>
					</div>
				)}
			</div>
		)
	}
}

export default Cart
