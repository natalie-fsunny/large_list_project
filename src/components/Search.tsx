import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { Settings } from "../types";

interface SearchProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const Search = ({ setSettings, settings }: SearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChooseSearchProperty = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      search: { ...prev.search, searchProperty: e.target.value },
    }));
  };

  const handleTextSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      search: { ...prev.search, searchString: e.target.value },
    }));
  };

  const handleToggleSearch = () => {
    if (isOpen) {
      setSettings((prev) => ({
        ...prev,
        search: { searchProperty: "", searchString: "" },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        search: { searchProperty: "name", searchString: "" },
      }));
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <Box p="20px 0" borderTop="1px solid black" borderBottom="1px solid black">
      <Button colorScheme="yellow" onClick={handleToggleSearch}>
        {isOpen ? "Cancel search" : "Start search"}
      </Button>

      {isOpen && (
        <Box mt="10px">
          <FormControl>
            <FormLabel>Search by</FormLabel>
            <Select
              value={settings.search.searchProperty}
              onChange={handleChooseSearchProperty}
            >
              <option value="name">Name</option>
              <option value="petName">Pet Name</option>
              <option value="email">Email</option>
              <option value="job">Job</option>
            </Select>
          </FormControl>
          <FormControl display="flex" gap="10px" mt="10px">
            <Input
              value={settings.search.searchString}
              onChange={handleTextSearchString}
            />
          </FormControl>
        </Box>
      )}
    </Box>
  );
};
