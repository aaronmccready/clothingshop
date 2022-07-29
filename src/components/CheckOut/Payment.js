import React, {useState} from "react";
import {withRouter} from "react-router-dom";

const Payment = (props) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cardCode, setCardCode] = useState("");

    const submit = () => {
        props.setAsInReview();

        props.history.push("/Review");
    };

    const handleChange = (e) => {
        if (e.target.id === "codeInputChange") {
            if(e.target.value.length > 4) return;
            else setCardCode(e.target.value);
        }
        else if (e.target.id === "cardNumberInputChange") {
            if (e.target.value.length > 20) return;
            else setCardNumber(e.target.value);
        }
    };

    return (
		<form id="paymentDiv" onSubmit={() => submit()}>
			<h2>Payment</h2>
			<div id="paymentInputField">
				<label>
					Card Number:
					<input
						id="cardNumberInputChange"
						onChange={(e) => handleChange(e)}
						type="number"
						value={cardNumber}
						min="10"
						required
					></input>
					<br></br>
					<p style={{ margin: "2px" }}>(must be 10 digits long)</p>
				</label>
				<label>
					Expiration Date:
					<input
						className="expirationDateInputChange"
						id="expirationMonth"
						type="month"
						onChange={(e) => setExpirationDate(e.target.value)}
						value={expirationDate}
						required
					></input>
				</label>
				<label>
					3 to 4 Digit Code:
					<input
						id="codeInputChange"
						onChange={(e) => handleChange(e)}
						value={cardCode}
						type="number"
						min="3"
						required
					></input>
				</label>
			</div>

			<button className="nextSectionButton" type="submit">
				Review Order
			</button>
		</form>
	);

};

export default withRouter(Payment);