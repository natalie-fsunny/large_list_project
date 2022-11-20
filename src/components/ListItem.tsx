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
import { useAppDispatch } from "../hooks";
import { deleteUser } from "../store/usersReducer";
import { User } from "../types";
import { getColorByName } from "../utils";

interface ListItemProps {
  user: User;
  onOpen: () => void;
  setEditingUserState: React.Dispatch<React.SetStateAction<User>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  usersCount: number;
}

export const ListItem = ({
  user: { email, favoriteColor, job, name, petName, petType, id },
  onOpen,
  setEditingUserState,
  setCurrentPage,
  usersCount,
}: ListItemProps) => {
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if ((usersCount - 1) % 10 === 0) {
      setCurrentPage((prev) => prev - 1);
    }
    dispatch(deleteUser(id));
  };

  const handleEdit = () => {
    setEditingUserState({
      email,
      favoriteColor,
      job,
      name,
      petName,
      petType,
      id,
    });
    onOpen();
  };

  return (
    <AccordionItem>
      <AccordionButton display="flex" justifyContent="space-between">
        <Box display="flex" gap="10px" alignItems="center">
          <Box
            backgroundColor={getColorByName(favoriteColor)}
            height="30px"
            width="30px"
            borderRadius="50%"
            border="1px solid black"
            flex="0 0 auto"
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
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </AccordionPanel>
    </AccordionItem>
  );
};
