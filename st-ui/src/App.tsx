import { useState } from "react";
import { Box, VStack, Container, Stack, Heading, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import SearchBar from "./components/searchBar/SearchBar";

import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container maxW={"5xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
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
            <SearchBar />
          </Box>
        </VStack>
      </Stack>
    </Container>
  );
};

export default App;
