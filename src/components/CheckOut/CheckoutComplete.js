import React from "react";
import { Link } from "react-router-dom";

const CheckoutComplete = () => {
	return (
		<div id="checkoutComplete">
			<h1 id="thankYouForYourOrder">Thank You For Your Order!</h1>

			<div id="goToShopElement">
				<Link to="/shop">Go Back To Shop</Link>
			</div>
		</div>
	);
};

export default CheckoutComplete;