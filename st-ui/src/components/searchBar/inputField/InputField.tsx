import { FC } from "react";
import { Input, IconButton, Text, Box, Flex } from "@chakra-ui/react";
import { useField } from "formik";
import { SearchIcon } from "@chakra-ui/icons";

type InputFieldProps = {
  name: string;
  id: string;
  type: string;
  placeholder: string;
};

export const InputField: FC<InputFieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Box w="100%">
      {meta.touched && meta.error ? (
        <Flex>
          <Text fontSize="md" color="red">
            {meta.error}
          </Text>
        </Flex>
      ) : null}
      <Flex>
        <Input {...field} {...props} />
        <IconButton
          type="submit"
          width={100}
          colorScheme="blue"
          aria-label="submit"
          icon={<SearchIcon />}
        />
      </Flex>
    </Box>
  );
};
