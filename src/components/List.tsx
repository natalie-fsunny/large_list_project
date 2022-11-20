import { useState } from "react";
import { Accordion, useDisclosure } from "@chakra-ui/react";
import { User } from "../types";
import { ListItem } from "./ListItem";
import { CustomModal } from "./Modal";
import { useAppDispatch } from "../hooks";
import { editUser } from "../store/usersReducer";

interface ListProps {
  usersForDisplaying: User[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const List = ({
  usersForDisplaying,
  currentPage,
  setCurrentPage,
}: ListProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [editingUserState, setEditingUserState] = useState<User>({
    email: "",
    petType: "cat",
    favoriteColor: "black",
    id: "",
    job: "",
    name: "",
    petName: "",
  });
  const dispatch = useAppDispatch();

  const handleSaveChanges = () => {
    dispatch(editUser(editingUserState));
    setEditingUserState({
      email: "",
      petType: "cat",
      favoriteColor: "black",
      id: "",
      job: "",
      name: "",
      petName: "",
    });
    onClose();
  };

  const handleCancelChanges = () => {
    setEditingUserState({
      email: "",
      petType: "cat",
      favoriteColor: "black",
      id: "",
      job: "",
      name: "",
      petName: "",
    });
    onClose();
  };

  return (
    <>
      <CustomModal
        userState={editingUserState}
        setUserState={setEditingUserState}
        handleSaveChanges={handleSaveChanges}
        handleCancelChanges={handleCancelChanges}
        title={"Edit user"}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Accordion allowToggle>
        {usersForDisplaying
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((user) => (
            <ListItem
              setCurrentPage={setCurrentPage}
              key={user.id}
              onOpen={onOpen}
              setEditingUserState={setEditingUserState}
              user={user}
              usersCount={usersForDisplaying.length}
            />
          ))}
      </Accordion>
    </>
  );
};
