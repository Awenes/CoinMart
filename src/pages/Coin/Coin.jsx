import { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { CoinContext } from "../../context/CoinContext";
import { useParams } from "react-router-dom";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null); // Initialize as null
  const { currency } = useContext(CoinContext);
  const [historicalData, setHistoricalData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const fetchCoinData = async () => {
    setIsLoading(true); // Add loading state

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-Ab6tz3azbfiQwEa17VbGHhRR",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      // Handle error appropriately (e.g., display an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Ab6tz3azbfiQwEa17VbGHhRR",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]); // Re-fetch data when coinId or currency changes

  if (isLoading) {
    return <div className="spinner">
      <div className="spin"></div>
    </div>
  }

  if (!coinData && !historicalData) { 
    return <div className="err">
        Error fetching coin data
      </div>;
  }

  return (
    <div className="coin">
      <div className="coinName">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} - {coinData.symbol.toUpperCase()}{" "}
          </b>
        </p>
      </div>
      <div className="coinChart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="info">
        <ul>
          <li>Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Price</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24h Change</li>
          <li>{coinData.market_data.price_change_24h}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Trading Volume</li>
          <li>
            {currency.symbol}{" "}
            {coinData.market_data.total_volume[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
