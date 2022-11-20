import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { List } from "./components/List";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";
import { Sort } from "./components/Sort";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Settings, User } from "./types";
import { CustomModal } from "./components/Modal";
import { addUser } from "./store/usersReducer";

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { users } = useAppSelector((state) => state.usersReducer);
  const [usersForDisplaying, setUsersForDisplaying] = useState(users);
  const [addingUserState, setAddingUserState] = useState<User>({
    email: "",
    petType: "cat",
    favoriteColor: "black",
    id: "",
    job: "",
    name: "",
    petName: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(usersForDisplaying.length <= 10);
  const [settings, setSettings] = useState<Settings>({
    search: { searchProperty: "", searchString: "" },
    filter: { filterProperty: "", filterString: "" },
    sort: { sortProperty: "name" },
  });
  const [userIsAdded, setUserIsAdded] = useState(false);
  const [deletedUserId, setDeletedUserId] = useState("");
  const dispatch = useAppDispatch();

  const handleFilterSearchSortUsers = () => {
    let newUsers = [...users];
    if (settings.search.searchProperty) {
      newUsers = newUsers.filter((user) =>
        user[settings.search.searchProperty as keyof User]
          .toLowerCase()
          .includes(settings.search.searchString.toLowerCase())
      );
    }
    if (settings.filter.filterProperty) {
      newUsers = newUsers.filter((user) =>
        user[settings.filter.filterProperty as keyof User]
          .toLowerCase()
          .startsWith(settings.filter.filterString.toLowerCase())
      );
    }
    newUsers.sort((a, b) =>
      a[settings.sort.sortProperty as keyof User].localeCompare(
        b[settings.sort.sortProperty as keyof User]
      )
    );
    setUsersForDisplaying(newUsers);
    setCurrentPage(1);
  };

  const handleSaveChanges = () => {
    setUserIsAdded(true);
    dispatch(addUser(addingUserState));
    setAddingUserState({
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
    setAddingUserState({
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

  useEffect(() => {
    handleFilterSearchSortUsers();
    if (userIsAdded) {
      setUserIsAdded(false);
    }
  }, [userIsAdded, settings]);

  useEffect(() => {
    setUsersForDisplaying((prev) =>
      prev.filter((user) => user.id !== deletedUserId)
    );
  }, [deletedUserId]);

  return (
    <ChakraProvider>
      <Container mt="30px">
        <CustomModal
          handleCancelChanges={handleCancelChanges}
          handleSaveChanges={handleSaveChanges}
          isOpen={isOpen}
          onClose={onClose}
          setUserState={setAddingUserState}
          title={"Add user"}
          userState={addingUserState}
        />
        <Box>
          <Box p="10px 0" borderBottom="1px solid black">
            <Button colorScheme="yellow" onClick={onOpen}>
              Add user
            </Button>
          </Box>
          <Search settings={settings} setSettings={setSettings} />
          <Filter settings={settings} setSettings={setSettings} />
          <Sort settings={settings} setSettings={setSettings} />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isLastPage={isLastPage}
            setIsLastPage={setIsLastPage}
            usersForDisplaying={usersForDisplaying}
          />
        </Box>
        <List
          usersForDisplaying={usersForDisplaying}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setDeletedUserId={setDeletedUserId}
          setUsersForDisplaying={setUsersForDisplaying}
        />
      </Container>
    </ChakraProvider>
  );
}

export default App;
