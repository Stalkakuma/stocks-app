import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStockData(data.message));
  }, []);

  return (
    <div className="app">
      <p>{!stockData ? "Loading..." : stockData}</p>
      <></>
    </div>
  );
};

export default App;
