import { StockSymbolValues } from "../types/types";

import { API_KEY, baseUrl } from "../utils/ApiData";

export const getStocksData = (stocksSymbols: StockSymbolValues[]) => {
  const filteredSymbols = filterStocksSymbols(stocksSymbols);
  const promises = filteredSymbols.map((symbol) =>
    fetch(`${baseUrl}stock/profile2?symbol=${symbol.symbol}${API_KEY}`)
      .then((res) => res.json())
      .catch((err) => console.log(err))
  );
  return Promise.all(promises);
};

const filterStocksSymbols = (stocksSymbols: StockSymbolValues[]) => {
  const filteredSymbols: StockSymbolValues[] = [];
  stocksSymbols.forEach((symbol) => {
    const isSymbolIncluded = filteredSymbols.some(
      (sym) => sym.description === symbol.description
    );
    if (symbol.type !== "" && !isSymbolIncluded) {
      filteredSymbols.push(symbol);
    }
  });
  return filteredSymbols;
};
