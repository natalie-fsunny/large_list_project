import { useEffect, useState } from "react";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { List } from "./components/List";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";
import { Sort } from "./components/Sort";
import { useAppSelector } from "./hooks";
import { Settings, User } from "./types";

function App() {
  const { users } = useAppSelector((state) => state.usersReducer);
  const [usersForDisplaying, setUsersForDisplaying] = useState(users);

  const [settings, setSettings] = useState<Settings>({
    search: { searchProperty: "name", searchString: "" },
    filter: { filterProperty: "petType", filterString: "" },
    sort: { sortProperty: "name" },
  });

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
  };

  useEffect(() => handleFilterSearchSortUsers(), [users, settings]);

  return (
    <ChakraProvider>
      <Container mt="30px">
        <Box>
          <Search settings={settings} setSettings={setSettings} />
          <Filter settings={settings} setSettings={setSettings} />
          <Sort settings={settings} setSettings={setSettings} />
          <Pagination />
        </Box>
        <List usersForDisplaying={usersForDisplaying} />
      </Container>
    </ChakraProvider>
  );
}

export default App;
