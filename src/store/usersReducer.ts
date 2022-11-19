import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { faker } from "@faker-js/faker";

const users: User[] = [];

for (let i = 0; i < 100; i++) {
  users.push({
    favoriteColor: faker.color.human(),
    job: faker.name.jobTitle(),
    name: faker.name.fullName(),
    petName: faker.name.firstName(),
    petType: faker.animal.type(),
    email: faker.internet.email(),
    id: faker.lorem.words() + faker.color.rgb() + faker.name.fullName(),
  });
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state: UsersState, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state: UsersState, action: PayloadAction<string>) => {
      const foundIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );
      state.users.splice(foundIndex, 1);
    },
    editUser: (state: UsersState, action: PayloadAction<User>) => {
      const foundIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[foundIndex] = action.payload;
    },
  },
});

export const { addUser, editUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
