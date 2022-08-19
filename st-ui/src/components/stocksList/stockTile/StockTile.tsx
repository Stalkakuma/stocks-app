import { FC } from "react";
import {
  Heading,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
import { FinnhubDataValues } from "../../../types/types";

type StockTileProps = {
  stock: FinnhubDataValues;
};

export const StockTile: FC<StockTileProps> = ({ stock }) => {
  return (
    <Box
      maxW={"480px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
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
      </Box>
    </Box>
  );
};
