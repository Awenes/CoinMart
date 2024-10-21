import { useContext } from "react";
import "./Navbar.css";
import "../../App.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Access the `setCurrency` function from the CoinContext
  const { setCurrency } = useContext(CoinContext);

  // Handle currency selection changes
  const currencyHandler = (event) => {
    const selectedCurrency = event.target.value; // Get selected value

    switch (selectedCurrency) {
      case "USD":
        setCurrency({ name: "usd", symbol: "$" }); // Update currency state with USD
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" }); // Update currency state with EUR
        break;
      case "ngn":
        setCurrency({ name: "ngn", symbol: "₦" }); // Update currency state with NGN
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" }); // Default to USD if invalid selection
        break;
    }
  };

  return (
    <div className="navbar">
      <span className="mart">
        {" "}
        {/* Class for logo area */}
        <Link to={"/"}>
          {" "}
          {/* Link to Home page */}
          <h1>CoinMart</h1>
        </Link>
      </span>

      <div className="nav-right">
        {" "}
        {/* Class for right side of navbar */}
        <select name="" id="" onChange={currencyHandler}>
          {" "}
          {/* Dropdown menu */}
          <option value="usd">USD</option> {/* Option for USD */}
          <option value="eur">Euro</option> {/* Option for EUR */}
          <option value="ngn">NGN</option> {/* Option for NGN */}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
