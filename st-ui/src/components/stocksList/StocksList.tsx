import { FC } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Center,
} from "@chakra-ui/react";
import { FinnhubDataValues } from "../../types/types";
import { StockTile } from "./stockTile/StockTile";

type StockListProps = {
  isLoading: boolean;
  stocksData: FinnhubDataValues[];
};

const temporaryData = [
  {
    country: "US",
    currency: "USD",
    exchange: "NASDAQ/NMS (GLOBAL MARKET)",
    ipo: "1980-12-12",
    marketCapitalization: 1415993,
    name: "Apple Inc",
    phone: "14089961010",
    shareOutstanding: 4375.47998046875,
    ticker: "AAPL",
    weburl: "https://www.apple.com/",
    logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
    finnhubIndustry: "Technology",
  },
  {
    country: "aa",
    currency: "Uaa",
    exchange: "NASDAQ/NMS (GLOBAL MARKET)",
    ipo: "1980-12-12",
    marketCapitalization: 1415993,
    name: "other name",
    phone: "14089961010",
    shareOutstanding: 4375.47998046875,
    ticker: "AAPL",
    weburl: "https://www.apple.com/",
    logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
    finnhubIndustry: "Technology",
  },
];

export const StocksList: FC<StockListProps> = ({ isLoading, stocksData }) => {
  return (
    <>
      {isLoading ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>My table Caption</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
              </Tr>
            </Thead>
            <Tbody>
              {temporaryData.map((stock) => (
                <Tr key={stock.name}>
                  <Center>
                    <StockTile stock={stock} />
                  </Center>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};
