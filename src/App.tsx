import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { List } from "./components/List";
import { Pagination } from "./components/Pagination";
import { Search } from "./components/Search";
import { Sort } from "./components/Sort";

function App() {
  return (
    <ChakraProvider>
      <Container>
        <Box>
          <Search />
          <Filter />
          <Sort />
          <Pagination />
        </Box>
        <List />
      </Container>
    </ChakraProvider>
  );
}

export default App;
