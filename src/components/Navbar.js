import React from "react";
import {Link} from "react-router-dom";
import Logo from "../images/Logo.png";
import shirt from "../components/t-shirt.png";

const Navbar = (props) => {
	return (
		<header id="navBarContainer">
			<div id="navBarList">
				<p id="homepage">
					<Link to="/">
						<img
							id="Logo"
							src={Logo}
							alt="logo"
							width="150"
							height="41.5"
						></img>
					</Link>
				</p>

				<div id="navBarRight">
					<p id="shopElement">
						<Link to="/shop">Shop</Link>
					</p>

					<p id="shoppingCartElement">
						<Link to="/cart">
							<span id="inShoppingCartCount">{props.sumQty}</span>
							<span id="shirtLink">
								<img
									id="shirtLogo"
									src={shirt}
									alt="Shopping Cart"
									width="35px"
									height="35px"
								></img>
							</span>
						</Link>
					</p>
				</div>
			</div>
		</header>
	);
};

export default Navbar;