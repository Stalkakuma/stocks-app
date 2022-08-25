import { FC } from "react";
import { FormControl, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "./inputField/InputField";

import { MyFormValues } from "../../types/types";

const SearchSchema = Yup.object().shape({
  stockName: Yup.string()
    .max(35, "Must be 35 characters or less")
    .required("Keyword or symbol required")
    .matches(/^[aA-zZ\s]+$/, "Must be an Alphabetic letter"),
});

type SearchBarProps = {
  setValues: (values: string) => void;
  setStartLoading: (startLoading: boolean) => void;
};

const SearchBar: FC<SearchBarProps> = ({ setValues, setStartLoading }) => {
  const initialValues: MyFormValues = { stockName: "" };

  return (
    <Stack spacing={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={SearchSchema}
        onSubmit={(values, { setSubmitting }) => {
          setValues(values.stockName.toString());
          setSubmitting(false);
          setStartLoading(true);
        }}
      >
        <Form>
          <FormControl>
            <InputField
              id="stockName"
              name="stockName"
              type="text"
              placeholder="Enter a symbol or a keyword"
            />
          </FormControl>
        </Form>
      </Formik>
    </Stack>
  );
};

export default SearchBar;
