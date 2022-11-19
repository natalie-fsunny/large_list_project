import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Settings } from "../types";
import { colors, getColorByName, pets } from "../utils";

interface FilterProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

export const Filter = ({ setSettings, settings }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChooseFilterProperty = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (
      e.target.value === "favoriteColor" &&
      settings.filter.filterProperty !== "favoriteColor"
    ) {
      setSettings((prev) => ({
        ...prev,
        filter: { filterString: "red", filterProperty: "favoriteColor" },
      }));
    } else if (
      e.target.value === "petType" &&
      settings.filter.filterProperty !== "petType"
    ) {
      setSettings((prev) => ({
        ...prev,
        filter: { filterString: "cat", filterProperty: "petType" },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        filter: { ...prev.filter, filterProperty: e.target.value },
      }));
    }
  };

  const handleChooseFilterString = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSettings((prev) => ({
      ...prev,
      filter: { ...prev.filter, filterString: e.target.value },
    }));
  };

  const handleToggleFilter = () => {
    if (isOpen) {
      setSettings((prev) => ({
        ...prev,
        filter: { filterProperty: "", filterString: "" },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        filter: { filterProperty: "favoriteColor", filterString: "red" },
      }));
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <Box p="20px 0" borderTop="1px solid black" borderBottom="1px solid black">
      <Button colorScheme="yellow" onClick={handleToggleFilter}>
        {isOpen ? "Cancel filter" : "Start filter"}
      </Button>

      {isOpen && (
        <Box mt="10px">
          <FormControl mb="10px">
            <FormLabel>Filter by</FormLabel>
            <Select
              value={settings.filter.filterProperty}
              onChange={handleChooseFilterProperty}
            >
              <option value="petType">Pet type</option>
              <option value="favoriteColor">Favorite color</option>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={settings.filter.filterString}
              onChange={handleChooseFilterString}
              backgroundColor={
                settings.filter.filterProperty === "favoriteColor"
                  ? getColorByName(settings.filter.filterString)
                  : "#00000000"
              }
            >
              {settings.filter.filterProperty === "petType"
                ? pets.map((pet) => (
                    <option value={pet} key={pet}>
                      {pet}
                    </option>
                  ))
                : Object.keys(colors).map((color) => (
                    <option
                      value={color}
                      key={color}
                      style={{
                        backgroundColor: getColorByName(color),
                      }}
                    ></option>
                  ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};
