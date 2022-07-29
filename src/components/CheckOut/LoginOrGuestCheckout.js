import React from "react";
import { Link } from "react-router-dom";

const LoginOrGuestCheckout = (props) => {
	if (props.currentUser)
		return (
			<div>
				<Link to="/Login">
					<button>Login</button>
				</Link>
				<span>OR</span>
				<Link to="/GeneralAccountInfo">
					<button>Check out as Guest</button>
				</Link>
			</div>
		);
	else return null;
};

export default LoginOrGuestCheckout;