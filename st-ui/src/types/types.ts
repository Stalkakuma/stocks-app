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

export interface UserDateContextValues {
  startValue: number | null;
  setStartValue: (date: number | null) => void;
  endValue: number | null;
  setEndValue: (date: number | null) => void;
}

export type Candle = {
  close: number | null;
  high: number | null;
  low: number | null;
  open: number | null;
  x: Date | null;
  volume: number | null;
};

export type FinnhubCandlesDataValues = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
};

export type FinnhubCandlesDataPayload = FinnhubCandlesDataValues | null;

export type CreateCandleHandler = (
  close: number,
  open: number,
  high: number,
  low: number,
  x: Date,
  v: number
) => Candle;
