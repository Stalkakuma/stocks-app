import { FC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { FinnhubDataValues } from "../../types/types";
import { StockTile } from "./stockTile/StockTile";

type StockListProps = {
  stocksData: FinnhubDataValues[];
};

export const StocksList: FC<StockListProps> = ({ stocksData }) => {
  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
      ]}
      gap={[3, 5, 5, 8, 8]}
    >
      {stocksData.map((stock) => (
        <GridItem key={stock.name}>
          <StockTile stock={stock} />
        </GridItem>
      ))}
    </Grid>
  );
};
