import { createContext, PropsWithChildren, useReducer, useState } from 'react';
// import users from '../data/Users';
import { UserData } from '../views/UserList';

interface UserCtx {
  state: { users: [UserData] | [] };
  dispatch: any;
}

interface Action {
  type: string;
  payload: UserData;
}

interface State {
  users: [UserData];
}

const UsersContext = createContext<any>({}); //@TO DO: FIX ANY TYPE

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const initialState = { users: {} };
  const actions = {
    loadUsers(state: State, action: Action) {
      const users = action.payload;
      return { ...state, users };
    },
    createUser(state: State, action: Action) {
      const user = action.payload;
      user.id = Math.random(); // THIS LINE IS GIVING AN ERROR!
      user.avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/33.jpg`;
      return { ...state, users: [...state.users, user] };
    },
    updateUser(state: State, action: Action) {
      const updated = action.payload;
      return { ...state, users: state.users.map((u) => (u.id === updated.id ? updated : u)) };
    },
    deleteUser(state: State, action: Action) {
      const user = action.payload;
      return { ...state, users: state.users.filter((u) => u.id !== user.id) };
    },
  };

  function reducer(state: State, action: Action) {
    const stateWillEvolve = actions[action.type as keyof typeof actions];

    return stateWillEvolve ? stateWillEvolve(state, action) : state;
  }
  const [state, dispatch] = useReducer<any>(reducer, initialState); //@TO DO: FIX ANY TYPE
  return (
    <UsersContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
