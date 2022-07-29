import React from "react";

const ShopItemCard = (props) => {
	return (
		<div className="shopItemCard">
			<img
				className="productImagesInShop"
				src={props.data.image}
				alt={props.data.name}
				height="332px"
				width="332px"
			></img>
			<h2>{props.data.name}</h2>
			<p>
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(props.data.price)}
			</p>
		</div>
	);
};

export default ShopItemCard;