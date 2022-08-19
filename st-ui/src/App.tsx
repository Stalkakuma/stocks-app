import { useState } from "react";
import { Box, VStack, Container, Flex, Heading, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import SearchBar from "./components/searchBar/SearchBar";

import "react-datepicker/dist/react-datepicker.css";
import { FinnhubDataValues } from "./types/types";
import { StocksList } from "./components/stocksList/StocksList";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stocksData, setStocksData] = useState<FinnhubDataValues[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const inputToApp = (stocksData: FinnhubDataValues[]) => {
    setStocksData(stocksData);
  };

  return (
    <Container maxW={"5xl"}>
      <Flex
        direction={"column"}
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
        alignContent={"center"}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Browse stock prices <br />
          <Text as={"span"} color={"green.400"}>
            and price history
          </Text>
        </Heading>

        <VStack>
          <Box w="20%">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
            />
          </Box>
          <Box w="60%">
            <SearchBar inputToApp={inputToApp} setIsLoading={setIsLoading} />
          </Box>
        </VStack>
        <StocksList isLoading={isLoading} stocksData={stocksData} />
      </Flex>
    </Container>
  );
};

export default App;
