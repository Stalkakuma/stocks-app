import { useState } from "react";
import { FormControl, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "./inputField/InputField";

import {
  MyFormValues,
  FinnhubDataValues,
  StockSymbolValues,
} from "../../types/types";

const SearchSchema = Yup.object().shape({
  stockName: Yup.string()
    .max(35, "Must be 35 characters or less")
    .required("Keyword required")
    .matches(/^[aA-zZ\s]+$/, "Must be an Alphabetic letter"),
});
const baseUrl = "https://finnhub.io/api/v1/";
const API_KEY = "&token=cbv0om2ad3i8ctr89vr0";

const SearchBar = () => {
  const initialValues: MyFormValues = { stockName: "" };
  const [stocksData, setStocksData] = useState<FinnhubDataValues[]>([]);
  console.log("START", stocksData);

  const loadStocks = async (values: string) => {
    const startArray: FinnhubDataValues[] = [];
    const newStockSymbolsData = await fetch(
      `${baseUrl}search?q=${values}${API_KEY}`
    )
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    newStockSymbolsData.result.forEach(async (stock: StockSymbolValues) => {
      const newStack = await fetch(
        `${baseUrl}stock/profile2?symbol=${stock.symbol}${API_KEY}`
      )
        .then((response) => response.json())
        .catch((err) => {
          console.log(err);
        });
      const newStackLength = Object.keys(newStack);
      if (newStackLength && newStackLength.length > 0) {
        startArray.push(newStack);
      }
    });
    setStocksData(startArray);
  };

  return (
    <Stack spacing={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={SearchSchema}
        onSubmit={(values, { setSubmitting }) => {
          loadStocks(values.stockName.toString());
          setSubmitting(false);
        }}
      >
        <Form>
          <FormControl>
            <InputField
              id="stockName"
              name="stockName"
              type="text"
              placeholder="Enter a keyword"
            />
          </FormControl>
        </Form>
      </Formik>
    </Stack>
  );
};

export default SearchBar;
