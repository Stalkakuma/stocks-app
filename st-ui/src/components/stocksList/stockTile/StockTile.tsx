import { FC } from "react";
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
import { motion } from "framer-motion";

import { FinnhubDataValues } from "../../../types/types";
import { PriceHistroy } from "../../priceHistory/PriceHistory";

type StockTileProps = {
  stock: FinnhubDataValues;
};

export const StockTile: FC<StockTileProps> = ({ stock }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as={motion.div}
        px={4}
        py={8}
        cursor={"pointer"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        onClick={onOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
        transition="0.1s linear"
      >
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

        {!stock.weburl ? (
          <br />
        ) : (
          <Link color="teal.500" href={stock.weburl} isExternal>
            {stock.weburl} <ExternalLinkIcon mx="2px" />
          </Link>
        )}
      </Box>
      <PriceHistroy
        stockTicker={stock.ticker}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
