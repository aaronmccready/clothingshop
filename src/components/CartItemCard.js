import React from "react";
import firebase from "../components/firebaseConfig";

import "firebase/firestore";

const firestore = firebase.firestore();

const CartItemCard = (props) => {
    const userCartRef = firestore
        .collection("users")
        .doc(`${props.uid}`)
        .collection("cart");
    
    const deleteItemFromCart = () => {
        userCartRef
        .doc(`${props.data.id}`)
        .delete()
        .catch((error) => console.log(error));
    };

    return (
        <div className="cartItemCard">
            <div className="cartImageDiv">
                <img
                className="productImagesInCart"
                src={props.data.image}
                alt={props.data.productName}
                ></img>
            </div>
            <div className="cartItemInfoDiv">
                <div className="itemNameAndPriceContainer">
                    <h3>{props.data.productName}</h3>
                    <p>
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "CAD",
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
                    <button
                        className="deleteFromCartButton"
                        onClick={() => deleteItemFromCart()}
                    >
                        - Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;