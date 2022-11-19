import { Accordion } from "@chakra-ui/react";
import { useAppSelector } from "../hooks";
import { ListItem } from "./ListItem";

export const List = () => {
  const { users } = useAppSelector((state) => state.usersReducer);
  return (
    <Accordion allowToggle>
      {users.map((user) => (
        <ListItem key={user.id} {...user} />
      ))}
    </Accordion>
  );
};
