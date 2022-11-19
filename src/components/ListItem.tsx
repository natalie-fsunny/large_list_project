import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { User } from "../types";
import { getColorByName } from "../utils";

export const ListItem = ({
  email,
  favoriteColor,
  job,
  name,
  petName,
  petType,
}: User) => {
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  return (
    <AccordionItem>
      <AccordionButton display="flex" justifyContent="space-between">
        <Box display="flex" gap="20px" alignItems="center">
          <Box
            backgroundColor={getColorByName(favoriteColor)}
            height="30px"
            width="30px"
            borderRadius="50%"
            border="1px solid black"
          ></Box>
          <Box
            textAlign="left"
            width={isLargerThan450 ? "100%" : "220px"}
            display="flex"
            flexDirection="column"
          >
            <Text as="strong" textOverflow="ellipsis">
              {name}
            </Text>
            <Text textOverflow="ellipsis">{job}</Text>
            <Text as="i" textOverflow="ellipsis">
              {email}
            </Text>
            <Text textOverflow="ellipsis">
              Has {petType} named {petName}
            </Text>
          </Box>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </AccordionPanel>
    </AccordionItem>
  );
};
