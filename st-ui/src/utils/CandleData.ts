import { Candle, CreateCandleHandler } from "../types/types";
import { FinnhubCandlesDataValues } from "../types/types";

const createCandle: CreateCandleHandler = (
  open,
  close,
  high,
  low,
  timestamp,
  volume
) => {
  return {
    open: open,
    close: close,
    high: high,
    low: low,
    x: timestamp,
    volume: volume,
  };
};

export const createCandlesList = (candlesData: FinnhubCandlesDataValues) => {
  const candles: Candle[] = [];
  if (!candlesData) {
    return null;
  }
  for (let i = 0; i < candlesData.c.length; i++) {
    const candleDate = new Date(candlesData.t[i] * 1000);
    candles.push(
      createCandle(
        candlesData.o[i],
        candlesData.c[i],
        candlesData.h[i],
        candlesData.l[i],
        candleDate,
        candlesData.v[i]
      )
    );
  }
  return candles;
};
