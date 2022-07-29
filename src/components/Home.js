import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
	return (
		<div>
			<div id="home">
				<div id="homepageText">
					<h1 id="sloganHeader">Choose the best. Choose us.</h1>
					<button id="startShoppingButton">
						<Link to="/shop">Start Shopping</Link>
					</button>
				</div>
			</div>
			<div id="buttonContainer">
				<Link
					to="/shop"
					id="linkToShirts"
					className="viewShirtsButton"
					onClick={props.handleFilter}
				>
					<span>Shirts</span>
				</Link>
				<Link
					to="/shop"
					id="linkToPants"
					className="viewPantsButton"
					onClick={props.handleFilter}
				>
					<span>Pants</span>
				</Link>

				<Link
					to="/shop"
					id="linkToJackets"
					className="viewJacketsButton"
					onClick={props.handleFilter}
				>
					<span>Jackets</span>
				</Link>
			</div>
			<div id="informationContainer">
				<div id="textInnerDiv">
					<h1>Wear better, look better.</h1>
					<p>
					At Yggdrasil, we’re not big on trends. We want you to wear our pieces for years, even decades, to come.
					 That’s why we source the finest materials and factories for our timeless products.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;