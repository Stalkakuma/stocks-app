import { FC, useEffect, useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
  VictoryAxis,
  VictoryLabel,
} from "victory";

import { API_KEY } from "../../utils/ApiData";
import { MainContext } from "../../utils/UserContext";
import { createCandlesList } from "../../utils/CandleData";
import { Candle } from "../../types/types";
import { sendToServer } from "../../utils/PostData";

const api = "https://finnhub.io/api/v1/stock/candle?symbol=";

interface PriceHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  stockTicker: string;
}

export const PriceHistroy: FC<PriceHistoryProps> = ({
  stockTicker,
  isOpen,
  onClose,
}) => {
  const context = useContext(MainContext);
  const [candles, setCandles] = useState<Candle[] | null>([]);
  const isDataReady =
    isOpen && context?.startValue !== null && context?.endValue !== null;
  const userActionData = candles
    ? {
        nameOfCompany: stockTicker,
        priceHistory: candles,
      }
    : null;

  useEffect(() => {
    if (context?.startValue && context?.endValue) {
      fetch(
        `${api}${stockTicker}&resolution=D&from=${context?.startValue}&to=${context?.endValue}${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => createCandlesList(data))
        .then((data) => setCandles(data))
        .catch((err) => console.log(err));
    }
  }, [stockTicker, context]);

  useEffect(() => {
    if (isDataReady) {
      sendToServer(userActionData);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {candles?.length ? `Stock candles for ${stockTicker}:` : null}
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          {candles?.length ? (
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 10 }}
              scale="linear"
            >
              <VictoryAxis
                label="Time axis"
                axisLabelComponent={<VictoryLabel dy={20} />}
                tickFormat={(t) =>
                  `${new Date(t).toLocaleDateString("en-gb", {
                    month: "short",
                    day: "numeric",
                  })}`
                }
              />
              <VictoryAxis dependentAxis />
              <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                data={candles}
              />
            </VictoryChart>
          ) : (
            <Heading size={"lg"} color="#c43a31">
              Sorry, no data available. Try a different date!
            </Heading>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
