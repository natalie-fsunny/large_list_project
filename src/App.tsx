import { useEffect, useState } from "react";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { List } from "./components/List";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";
import { Sort } from "./components/Sort";
import { useAppSelector } from "./hooks";

function App() {
  const { users } = useAppSelector((state) => state.usersReducer);
  const [usersForDisplaying, setUsersForDisplaying] = useState(users);

  useEffect(() => setUsersForDisplaying(users), [users]);

  return (
    <ChakraProvider>
      <Container>
        <Box>
          <Search />
          <Filter />
          <Sort />
          <Pagination />
        </Box>
        <List usersForDisplaying={usersForDisplaying} />
      </Container>
    </ChakraProvider>
  );
}

export default App;
