import './App.css';
import React, {useEffect, useState} from "react";
import {HashRouter as Router, Switch, Route } from "react-router-dom"

import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import ItemDetails from "./components/ItemDetails";
import Payment from "./components/CheckOut/Payment";
import Footer from "./components/Footer";

import CheckoutComplete from "./components/CheckOut/CheckoutComplete";

import firebase from "./components/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import UserGeneralInfoAndShippingOptions from "./components/CheckOut/UserGeneralInfoAndShippingOptions";

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

const App = () => {
  const productsRef = firestore.collection("products");
  const productsQuery = productsRef.orderBy("category", "asc");

  const [products] = useCollectionData(productsQuery, {idField: "id"});
  const [productList, setProductList] = useState([{}]);

  const usersRef = firestore.collection("users");
  const [currentUser, setCurrentUser] = useState("");

  const [isInReview, setIsInReview] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(0);

  const [filteredArray, setFilteredArray] = useState(products);

  const userCartRef = firestore
    .collection("users")
    .doc(`${currentUser.uid}`)
    .collection("cart");
  const userCartQuery = userCartRef.orderBy("productName", "asc");

  const [cartList] = useCollectionData(userCartQuery, {idField: "id"});

  const handleFilter = (e) => {
    if (e.target.className === "viewAllButton") {
        setFilteredArray(productList);
    }
    else if (e.target.className === "viewPantsButton") {
      return setFilteredArray(
          productList.filter((todo) => {
            return todo.category === "pants";
          })
      );
    }
    else if (e.target.className === "viewShirtsButton") {
      return setFilteredArray(
        productList.filter((todo) => {
          return todo.category === "shirt";
        })
      );
    }
    else {
      return setFilteredArray(
        productList.filter((todo) => {
          return todo.category === "jacket";
        })
      );
    }
  };

  const signInAnonymously = () => {
    firebaseAuth
      .signInAnonymously()
      .then(() => {
        addAnonUserToFirestore();
      })
      .then(() => {
        localStorage.setItem("uid", currentUser.uid);
      })
      .catch((error) => console.log(error));
  };

  const sumQty = () => {
    if (cartList === undefined || cartList.length <= 0) return 0;
    else {
      return cartList
        .map((item) => item.quantity)
        .reduce((prev, curr) => prev + curr);
    }
  };

  const addAnonUserToFirestore = async () => {
    if (currentUser.uid !== null || currentUser.uid !== undefined) {
      try {
        usersRef.doc(`${currentUser.uid}`).set({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          userID: currentUser.uid,
          cardNumber: "",
          expirationDate: "",
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  };

  const authStateObserver = (user) => {
    if(user) {
      setCurrentUser(firebaseAuth.currentUser);
    }
  };

  const setAsInReview = (e) => {
    setIsInReview((prevState) => !prevState);
  };

  const selectShippingCharge = (e) => {
    setShippingCharge(Number(e.target.value));
  };

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(authStateObserver);
  }, [currentUser]);

  useEffect(() => {
    if (!localStorage.getItem("uid")){
      signInAnonymously();
    }
  }, [currentUser]);

  useEffect(() => {
    setFilteredArray(productList);
  }, [productList]);

  return (
		<Router basename={process.env.PUBLIC_URL + "/"}>
			<Navbar sumQty={sumQty()} />
			<Switch>
				<Route exact path="/">
					<Home handleFilter={handleFilter}></Home>
				</Route>

				<Route exact path="/shop">
					<Shop
						productList={productList}
						filteredArray={filteredArray}
						handleFilter={handleFilter}
					/>
				</Route>

				<Route exact path="/cart">
					<Cart
						isInReview={isInReview}
						setAsInReview={setAsInReview}
						sumQty={sumQty()}
					/>
				</Route>

				<Route exact path="/shop/:productName">
					<ItemDetails
						signInAnonymously={() => signInAnonymously()}
					></ItemDetails>
				</Route>
				<Route exact path="/GeneralInfo">
					<UserGeneralInfoAndShippingOptions
						currentUser={currentUser}
						selectShippingCharge={(e) => selectShippingCharge(e)}
					></UserGeneralInfoAndShippingOptions>
				</Route>

				<Route exact path="/Payment">
					<Payment
						isInReview={isInReview}
						setAsInReview={setAsInReview}
					></Payment>
				</Route>
				<Route exact path="/Review">
					<Cart
						isInReview={isInReview}
						setAsInReview={setAsInReview}
						shippingCharge={shippingCharge}
					/>
				</Route>
				<Route
					exact
					path="/checkout-complete"
					component={CheckoutComplete}
				></Route>
			</Switch>
			<Footer></Footer>
		</Router>
	);

};

export default App;
