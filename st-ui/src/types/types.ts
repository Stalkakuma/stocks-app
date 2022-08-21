export interface MyFormValues {
  stockName: string;
}

export type FinnhubDataValues = {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
};

export type StockSymbolValues = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};
