import React, {useState} from "react";
import uniqid from "uniqid";
import CartItemCard from "./CartItemCard";
import CheckoutReviewItemCard from "./CheckoutReviewItemCard";
import {Link} from "react-router-dom";

import firebase from "../components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const Cart = (props) => {
    const [uid, setUid] = useState(() => {
        if (firebaseAuth.currentUser === null) {
            return localStorage.getItem("uid");
        }
        else {
            return firebaseAuth.currentUser.uid;
        }
    });

    const userCartRef = firestore
        .collection("users")
        .doc(`${uid}`)
        .collection("cart");
    const userCartQuery = userCartRef.orderBy("productName", "asc");

    const [cartList] = useCollectionData(userCartQuery, {idField: "id"});

    const cartRendering = () => {
        if (cartList === undefined) {
            return <div>LOADING</div>
        }
        else if (cartList.length === 0) {
            return (
                <div id="emptyCartContainer">
                    <h1 id="yourCartIsEmpty">Your Cart Is Empty</h1>
                    <div id="goToShopElement">
                        <Link to="/shop">Start Shopping</Link>
                    </div>
                </div>
            );
        }
        if (props.isInReview) {
            return cartList.map((element, index) => (
                <div className="cartItemCardContainer" key={uniqid()}>
                    <CheckoutReviewItemCard
                        key={uniqid()}
                        id={element.id}
                        index={index}
                        uid={uid}
                        data={element}
                        onChangeQty={(e) => props.onChangeQty(e)}
                        inCart={true}
                        deleteFromCart={() => props.deleteFromCart(element, index)}
                        />
                </div>
            ));
        }
        else {
            return cartList.map((element, index) => (
                <div className="cartItemCardContainer" key={uniqid()}>
                    <CartItemCard
                        key={uniqid()}
                        id={element.id}
                        index={index}
                        uid={uid}
                        data={element}
                        onChangeQty={(e) => props.onChangeQty(e)}
                        inCart={true}
                        deleteFromCart={() => props.deleteFromCart(element, index)}
                        />
                </div>
            ));
        }
    };

    const clearCart = () => {
        cartList.map((cartItemId) => {
            return userCartRef
                .doc(`${cartItemId.id}`)
                .delete()
                .catch((error) => console.log(error));
        });
    };

    const submitOrderWrapper = (e) => {
        props.setAsInReview(e);
        clearCart();
    };

    const sumOrder = () => {
        let totalsArray = [];

        if (cartList === undefined || cartList.length <= 0) return 0;
        else {
            cartList.map((item) => {
                return totalsArray.push(item.quantity * item.price)
            });
            return totalsArray.reduce((acc, curr) => acc + curr);
        }
    };

    const displayShippingCharge = () => {
        if (props.shippingCharge === undefined) return "TBD";
        else
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "CAD",
            }).format(props.shippingCharge);
    };

    const grandTotal = () => {
        let grandTotalCost = sumOrder() + props.shippingCharge;

        if (isNaN(props.shippingCharge) || props.shippingCharge === undefined) {
            grandTotalCost = sumOrder();
        }
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "CAD",
        }).format(grandTotalCost);
    };

    const buttonRender = () => {
        if (cartList === undefined || cartList.length <= 0 || props.sumQty <= 0)
            return null;
        else if (props.isInReview)
            return (
                <div id="buttonDiv">
                    <Link to="/checkout-complete">
                        <button id="checkoutButton" onClick={(e) => submitOrderWrapper(e)}>
                            SUBMIT ORDER
                        </button>
                    </Link>
                    <button
                        className="cancelOrderButton"
                        onClick={(e) => {
                            props.setAsInReview(e);
                        }}
                        >
                            CANCEL
                        </button>
                </div>
            );
        else
            return (
                <Link to="/GeneralInfo">
                    <button id="checkoutButton">CHECKOUT</button>
                </Link>
            );
    };

    return (
        <div id="cartContainer">
            <div id="totalsContainer">
                <h3>Order Summary</h3>
                <p>Order Quantity</p>
                <p>
                    Order Total:{" "}
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(sumOrder())}{" "}
                </p>
                <p>Shipping Charge: {displayShippingCharge()}</p>
                <p>Grand Total: {grandTotal()}</p>
                {buttonRender()}
            </div>
            {cartRendering()}
        </div>
    );

};

export default Cart;