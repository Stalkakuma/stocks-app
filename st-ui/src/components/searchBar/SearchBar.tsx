import { FormControl, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./inputField/InputField";

interface MyFormValues {
  stockName?: string;
}

const SearchSchema = Yup.object().shape({
  stockName: Yup.string()
    .max(35, "Must be 35 characters or less")
    .required("Keyword required")
    .matches(/^[aA-zZ\s]+$/, "Must be an Alphabetic letter"),
});

const SearchBar = () => {
  const initialValues: MyFormValues = { stockName: "" };
  return (
    <Stack spacing={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={SearchSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <form>
          <FormControl>
            <InputField
              id="stockName"
              name="stockName"
              type="text"
              placeholder="Enter a keyword"
            />
          </FormControl>
        </form>
      </Formik>
    </Stack>
  );
};

export default SearchBar;
