import { createContext, useEffect, useState } from "react";

// Create a context named CoinContext to store and share coin-related data
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  // State variables for coin data, currency, and loading state
  const [allCoin, setAllCoin] = useState([]); // List of all coins
  const [currency, setCurrency] = useState({
    // Default currency
    name: "usd",
    symbol: "$",
  });
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Function to fetch all coin data from the CoinGecko API
  const fetchAllCoin = async () => {
    setIsLoading(true); // Set loading state to true before fetching

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Ab6tz3azbfiQwEa17VbGHhRR", // Replace with your API key
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error(err);
      // Handle error by displaying an error message to the user
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  // Fetch all coins whenever the currency changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]); // Dependency array: fetch data only when currency changes

  // Define the values to be provided through the context
  const contextValue = {
    allCoin, // List of all coins
    currency, // Selected currency object
    setCurrency, // Function to update the selected currency
    isLoading, // Loading state
  };

  // Wrap children components with the CoinContext.Provider
  // to make context values available to them
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
