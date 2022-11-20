import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";
import { User } from "../types";
import { colors, getColorByName, pets } from "../utils";

interface FormProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  isPossibleEmptySelectOptions?: boolean;
}

export const Form = ({
  userState,
  setUserState,
  isPossibleEmptySelectOptions = false,
}: FormProps) => {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    propertyName:
      | "favoriteColor"
      | "name"
      | "job"
      | "email"
      | "petName"
      | "petType"
  ) => {
    setUserState((prev) => {
      const newState = { ...prev };
      newState[propertyName] = e.target.value;
      return newState;
    });
  };
  return (
    <form>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <Select
          value={userState.favoriteColor}
          backgroundColor={
            userState.favoriteColor && getColorByName(userState.favoriteColor)
          }
          onChange={(e) => handleChange(e, "favoriteColor")}
        >
          {isPossibleEmptySelectOptions && (
            <option key="" value="">
              None
            </option>
          )}
          {Object.keys(colors).map((color) => (
            <option
              key={color}
              value={color}
              style={{
                backgroundColor: colors[color as keyof typeof colors],
              }}
            >
              {color}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={userState.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Job</FormLabel>
        <Input value={userState.job} onChange={(e) => handleChange(e, "job")} />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          value={userState.email}
          onChange={(e) => handleChange(e, "email")}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Pet type</FormLabel>
        <Select
          value={userState.petType}
          onChange={(e) => handleChange(e, "petType")}
        >
          {isPossibleEmptySelectOptions && (
            <option key="" value="">
              None
            </option>
          )}
          {pets.map((pet) => (
            <option key={pet} value={pet}>
              {pet}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Pet name</FormLabel>
        <Input
          value={userState.petName}
          onChange={(e) => handleChange(e, "petName")}
        />
      </FormControl>
    </form>
  );
};
