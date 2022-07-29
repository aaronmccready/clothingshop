import React from "react";
import facebook from "../Icons/icons8-facebook.svg";
import instagram from "../Icons/icons8-instagram.svg";
import twitter from "../Icons/icons8-twitter-24.png";

const Footer = () => {
	return (
		<footer id="footer">
			<label>
				<h2>EMAIL SIGNUP</h2>
				<div id="inputAndSendButtonDiv">
					<input
						placeholder="Email Address"
						id="emailSignUpForm"
						type="email"
					></input>
					<button id="sendEmailSignUpButton">Send</button>
				</div>
			</label>
			<div id="followUsDiv">
				<h2>Follow Us</h2>
				<img
					className="socialIcons"
					alt="facebook"
					width="26"
					height="26"
					src={facebook}
				></img>
				<img
					className="socialIcons"
					alt="instagram"
					width="26"
					height="26"
					src={instagram}
				></img>
				<img
					className="socialIcons"
					alt="twitter"
					width="26"
					height="26"
					src={twitter}
				></img>
			</div>
		</footer>
	);
};

export default Footer;