import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext"; // Import CoinContext for accessing coin data
import { Link } from "react-router-dom"; // Import Link for routing to coin details page

const Home = () => {
  // Access all coins and selected currency from CoinContext
  const { allCoin, currency } = useContext(CoinContext);

  // State variables for search and displaying coins
  const [displayCoin, setDisplayCoin] = useState([]); // List of coins to display
  const [input, setInput] = useState(""); // Search input value

  // Handles user input in the search bar
  const inputHandler = (event) => {
    setInput(event.target.value);

    // Reset displayed coins to all coins if input is empty
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  // Handles search form submission
  const searchHandler = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Filter coins based on user input (name or symbol)
    const coins = await allCoin.filter((item) => {
      return (
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.symbol.toLowerCase().includes(input.toLowerCase())
      );
    });

    // Update displayed coins with filtered results
    setDisplayCoin(coins);
  };

  // Set displayed coins to all coins initially and whenever allCoin changes
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          The Best <br /> Crypto Info Platform
        </h1>
        <p>Welcome to CoinMart. The best platform for Crypto updates.</p>
        <form onSubmit={searchHandler}>
          {/* Search input with datalist for suggestions */}
          <input
            onChange={inputHandler}
            list="coinList"
            value={input}
            type="text"
            placeholder="Search..."
            required
          />
          <datalist id="coinList">
            {/* Display coin names as suggestions in the datalist */}
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="cryptoTable">
        <div className="layout">
          {/* Table headers */}
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h Change</p>
          <p className="cap">Market Cap</p>
        </div>
        {/* Display the first 10 filtered coins */}
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              {/* Group image and name for proper layout */}
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            {/* Display price with currency symbol */}
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            {/* Show color-coded percentage change */}
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {/* Round and format percentage change to two decimal places */}
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            {/* Display market cap with currency symbol */}
            <p className="cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
