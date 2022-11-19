import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Settings } from "../types";

interface SortProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const Sort = ({ setSettings, settings }: SortProps) => {
  const handleChooseSortProperty = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      sort: { ...prev.sort, sortProperty: e.target.value },
    }));
  };

  return (
    <Box p="20px 0" borderTop="1px solid black" borderBottom="1px solid black">
      <FormControl mb="10px">
        <FormLabel>Sort by</FormLabel>
        <Select
          value={settings.sort.sortProperty}
          onChange={handleChooseSortProperty}
        >
          <option value="name">Name</option>
          <option value="petName">Pet name</option>
          <option value="job">Job</option>
          <option value="email">Email</option>
        </Select>
      </FormControl>
    </Box>
  );
};
