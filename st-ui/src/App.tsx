import { useEffect, useState } from "react";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";

const App = () => {
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
            <p> Input here</p>
          </Center>
        </GridItem>
        <GridItem>
          <Center>
            <p>Date picker here</p>
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
