import React, {useState} from "react";
import {withRouter} from "react-router-dom";

const UserGeneralInfoAndShippingOptions = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [sameAsShippingAddress, setSameAsShippingAddress] = useState("flex");

    const submit = () => {
        console.log("Submitted!");
        props.history.push("/Payment");
    };

    const renderInputOrHeading = () => {
        if (props.currentUser.isAnonymous) {
            return (
                <div id="nameAndEmailDiv">
					<div>
						<h2>General Information:</h2>
						<p>
							<span style={{ color: "red", padding: 0 }}>* </span> is required
						</p>
					</div>

					<div className="inputFields">
						<label>
							First Name
							<input
								type="text"
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="John"
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Last Name:
							<input
								type="text"
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Smith"
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Email:
							<input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="JohnSmith@email.com"
								required
							></input>
						</label>
					</div>
				</div>
            );
        }
        else {
            <div>
				<label>
					First Name:
					<h4>{firstName}</h4>
				</label>
				<label>
					Last Name:
					<h4>{lastName}</h4>
				</label>
				<label>
					Email:
					<h4>{email}</h4>
				</label>
			</div>;
        }
    };

    return (
		<form onSubmit={() => submit()} id="generalAccountInfoForm">
			{renderInputOrHeading()}
			<div id="shippingAndBillingAddressContainer">
				<div id="shippingAddressDiv">
					<h2>Shipping Address:</h2>
					<div className="inputFields">
						<label>
							Street Address
							<input
								className="streetAddressInputChange"
								type="text"
								required
							></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							City:
							<input className="cityInputChange" type="text" required></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							State:
							<input className="stateInputChange" type="text" required></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Zip:
							<input
								className="zipcodeInputChange"
								type="text"
								required
							></input>
						</label>
					</div>
				</div>

				<div id="billingAddressDiv" style={{ display: sameAsShippingAddress }}>
					<h2>Billing Address:</h2>
					<div className="inputFields">
						<label>
							Street Address
							<input className="streetAddressInputChange" type="text"></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							City:
							<input className="cityInputChange" type="text"></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							State:
							<input className="stateInputChange" type="text"></input>
						</label>
					</div>
					<div className="inputFields">
						<label>
							Zip:
							<input className="zipcodeInputChange" type="text"></input>
						</label>
					</div>
				</div>
			</div>
			<div style={{ margin: "0 0 15px 0" }}>
				<input
					type="checkbox"
					onClick={() =>
						setSameAsShippingAddress((prevstate) =>
							prevstate === "none" ? "flex" : "none"
						)
					}
				></input>
				<span>My billing address is the same as the shipping address.</span>
			</div>
			<div id="shippingOptionsDiv">
				<h2>Shipping Options: </h2>
				<div id="shippingOptionsInput">
					<div>
						{" "}
						Free - $0.00
						<input
							onChange={(e) => props.selectShippingCharge(e)}
							type="radio"
							name="shippingOption"
							value={0}
							required
						></input>
					</div>
					<div>
						Standard - $5.00
						<input
							onChange={(e) => props.selectShippingCharge(e)}
							name="shippingOption"
							type="radio"
							value={5}
							required
						></input>
					</div>
					<div>
						Express - $10.00
						<input
							onChange={(e) => props.selectShippingCharge(e)}
							name="shippingOption"
							type="radio"
							value={10}
							required
						></input>
					</div>
				</div>
			</div>

			<button className="nextSectionButton" onSubmit={() => submit()}>
				Payment Options
			</button>
		</form>
	);

};

export default withRouter(UserGeneralInfoAndShippingOptions);