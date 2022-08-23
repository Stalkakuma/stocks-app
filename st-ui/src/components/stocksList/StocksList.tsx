import { FC } from "react";
import { List, ListItem, Center } from "@chakra-ui/react";
import { FinnhubDataValues } from "../../types/types";
import { StockTile } from "./stockTile/StockTile";

type StockListProps = {
  stocksData: FinnhubDataValues[];
};

export const StocksList: FC<StockListProps> = ({ stocksData }) => {
  return (
    <List>
      {stocksData.map((stock) => (
        <ListItem key={stock.name}>
          <Center flexDirection={"column"}>
            <StockTile stock={stock} />
          </Center>
        </ListItem>
      ))}
    </List>
  );
};
