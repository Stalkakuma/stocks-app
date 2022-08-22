import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
  VictoryAxis,
} from "victory";

interface PriceHistoryProps {
  candlesData: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PriceHistroy: FC<PriceHistoryProps> = ({
  candlesData,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {candlesData && (
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              scale={{ x: "time" }}
            >
              <VictoryAxis
                scale="time"
                tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}
              />
              <VictoryAxis dependentAxis />
              <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                data={candlesData.c}
              />
            </VictoryChart>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
