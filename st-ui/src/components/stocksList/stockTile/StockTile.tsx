import { FC, useContext, useEffect, useState } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { FinnhubDataValues } from "../../../types/types";
import { PriceHistroy } from "../../priceHistory/PriceHistory";
import { MainContext } from "../../../utils/UserContext";

const api = "https://finnhub.io/api/v1/stock/candle?symbol=";
const API_KEY = "&token=cbv0om2ad3i8ctr89vr0";

type StockTileProps = {
  stock: FinnhubDataValues;
};

export const StockTile: FC<StockTileProps> = ({ stock }) => {
  const context = useContext(MainContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [candlesData, setCandlesData] = useState();

  useEffect(() => {
    if (!stock) {
      return;
    }
    fetch(
      `${api}${stock.ticker}&resolution=1&from=${context?.startValue}&to=${context?.endValue}${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setCandlesData(data));
  }, [stock, context]);

  return (
    <>
      <Box
        maxW={"480px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        my={"5px"}
        onClick={onOpen}
      >
        <Box p={6}>
          <Flex direction={"row"} justify={"center"}>
            <Text fontWeight={600}>{stock.ticker}</Text>
            <Spacer />
            <Text fontWeight={600}>{stock.currency}</Text>
          </Flex>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {stock.name}
            </Heading>
            <Text color={"gray.500"}>{stock.country}</Text>
          </Stack>

          {!stock.weburl ? null : (
            <Link color="teal.500" href={stock.weburl} isExternal>
              {stock.weburl} <ExternalLinkIcon mx="2px" />
            </Link>
          )}
        </Box>
      </Box>
      <PriceHistroy
        candlesData={candlesData}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
