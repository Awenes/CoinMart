import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ historicalData }) => {
  // State variable to store the chart data in the format expected by react-google-charts
  const [data, setData] = useState([["Date", "Prices"]]); // Initial state with header row

  // useEffect hook to process historical data and update chart data
  useEffect(() => {
    let dataCopy = [["Date", "Prices"]]; // Create a copy to avoid mutating original

    // Check if historical data has prices property (might be null)
    if (historicalData?.prices) {
      historicalData.prices.map((item) => {
        // Process each price data point
        const dateString = new Date(item[0]).toLocaleDateString().slice(0, -5); // Format date without year
        const price = item[1]; // Extract price value

        // Add a new row to the chart data with formatted date and price
        dataCopy.push([dateString, price]);
      });
    }

    // Update the chart data state with the processed data
    setData(dataCopy);
  }, [historicalData]); // Re-run effect whenever historicalData changes

  return (
    <Chart
      chartType="LineChart" // Specify chart type as LineChart
      data={data} // Provide the processed chart data
      height="100%" // Set chart height to 100%
      legendToggle // Enable legend for easier data identification
    />
  );
};

export default LineChart;
