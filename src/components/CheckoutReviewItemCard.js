import React from "react"

const CartItemCard = (props) => {
    return (
        <div className="cartItemCard">
            <div className="cartImageDiv">
                <img className="productImagesInCart" src={props.data.image} alt={props.data.name}></img>
            </div>
            <div className="cartItemInfoDiv">
                <div className="itemNameAndPriceContainer">
                    <h3>{props.data.name}</h3>
                    <p>
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "CAD"
                        }).format(props.data.price)}
                    </p>
                    <p>
                        <b>Size: </b> {props.data.size}
                    </p>
                    <p>
                        <b>Colour: </b> {props.data.colour}
                    </p>
                </div>
                <div className="qtyAndRemoveButtonContainer">
                    <div className="increaseOrDecreaseQtyContainer">
                        <p>Quantity: {props.data.quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;