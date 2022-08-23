import { useState } from "react";
import { Box, VStack, Container, Flex, Heading, Text } from "@chakra-ui/react";
import SearchBar from "./components/searchBar/SearchBar";

import "react-datepicker/dist/react-datepicker.css";
import { FinnhubDataValues, StockSymbolValues } from "./types/types";
import { StocksList } from "./components/stocksList/StocksList";
import { DatePickerWidget } from "./components/datePickerWidget/DatePickerWidget";
const baseUrl = "https://finnhub.io/api/v1/";
const API_KEY = "&token=cbv0om2ad3i8ctr89vr0";

const App = () => {
  const [startLoading, setStartLoading] = useState(false);
  const [values, setValues] = useState("");
  const [stocksData, setStocksData] = useState<FinnhubDataValues[]>([]);
  const hasDataLoaded = !startLoading && stocksData;

  const getStocksData = (stocksSymbols: StockSymbolValues[]) => {
    const promises = stocksSymbols.map((symbol) =>
      fetch(`${baseUrl}stock/profile2?symbol=${symbol.symbol}${API_KEY}`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
    );
    return Promise.all(promises);
  };

  const loadStocks = () => {
    fetch(`${baseUrl}search?q=${values}${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const promise = getStocksData(data.result);
        return Promise.all([promise]);
      })
      .then(([data]) => {
        const uniqueStocks: FinnhubDataValues[] = [];
        data.forEach((stock) => {
          const stockLength = Object.keys(stock);
          const isStockIncluded = uniqueStocks.some(
            (sto) => sto.name === stock.name
          );
          if (
            !stock.error &&
            stockLength.length > 0 &&
            !isStockIncluded &&
            stock.type !== ""
          ) {
            uniqueStocks.push(stock);
          }
        });
        return uniqueStocks;
      })
      .then((data) => {
        setStocksData(data);
      })
      .catch((err) => console.log(err));
  };

  if (startLoading && values.length !== 0) {
    loadStocks();
    setStartLoading(false);
  }

  return (
    <Container maxW={"5xl"}>
      <Flex
        direction={"column"}
        as={Box}
        textAlign={"center"}
        gap={15}
        py={{ base: 20, md: 36 }}
        alignContent={"center"}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Browse stocks <br />
          <Text as={"span"} color={"green.400"}>
            and their prices
          </Text>
        </Heading>

        <VStack>
          <DatePickerWidget />
          <Box w="60%">
            <SearchBar
              setValues={setValues}
              setStartLoading={setStartLoading}
            />
          </Box>
          {!startLoading && values.length !== 0 && stocksData.length === 0 && (
            <Heading size={"lg"} color="#c43a31">
              Loading...
            </Heading>
          )}
        </VStack>
        {hasDataLoaded && <StocksList stocksData={stocksData} />}
      </Flex>
    </Container>
  );
};

export default App;
