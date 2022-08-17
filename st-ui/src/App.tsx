import { useEffect, useState } from "react";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStockData(data.message));
  }, []);

  return (
    <Box>
      <Grid templateColumns="repeat(2 , 1fr)" gap={6}>
        <GridItem>
          <Center>
            <p> Input here...</p>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <Box>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
              />
            </Box>
          </Center>
        </GridItem>
      </Grid>
      <Center>
        <div className="app">
          <p>{!stockData ? "Loading..." : stockData}</p>
        </div>
      </Center>
    </Box>
  );
};

export default App;
