import React from "react";
import { useState } from "react";
import "./SignUpForm.css";

function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    if (!token) {
      setError(alert("Please sign up first before you authenticate a token"));
      return;
    }
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      setSuccessMessage(result.message);

      const username = result.data.username;
      console.log("Your Username is:", username);

      setSuccessMessage(`Authenticated as ${username}`);
      alert(
        "Token successful! See console log for sign up bonus. Rest form to get new token"
      );
    } catch (error) {
      setError(error.message);
    }
  } //last curly of handleClick

  return (
    <>
      <h2>Next, Authenticate</h2>

      <img src="./images/tokenImg.jpg" className="tokenImg" />

      {successMessage && (
        <p>
          {successMessage} {console.log("You get free coupons for a year!")}
        </p>
      )}
      {error && <p>{error}</p>}

      <button onClick={handleClick} className="authenticateToken">
        "Authenticate Token"
      </button>
    </>
  );
}

export default Authenticate;
