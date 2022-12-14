import { useState } from "react";
import { Box, VStack, Container, Flex, Heading, Text } from "@chakra-ui/react";
import SearchBar from "./components/searchBar/SearchBar";

import { API_KEY, baseUrl } from "./utils/ApiData";
import { getStocksData } from "./utils/GetStocksData";
import { FinnhubDataValues } from "./types/types";
import { StocksList } from "./components/stocksList/StocksList";
import { DatePickerWidget } from "./components/datePickerWidget/DatePickerWidget";

const App = () => {
  const [startLoading, setStartLoading] = useState(false);
  const [values, setValues] = useState("");
  const [stocksData, setStocksData] = useState<FinnhubDataValues[]>([]);
  const hasDataLoaded = !startLoading && stocksData;

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

          if (!stock.error && stockLength.length > 0) {
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
