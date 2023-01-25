import { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { UserData } from '../views/UserList';

interface UserCtx {
  state: {
    users: UserData[] | [];
  };
  dispatch: React.Dispatch<Action>;
}

interface Action {
  type: string;
  payload: UserData | UserData[];
}

interface State {
  users: UserData[] | [];
}

const UsersContext = createContext({} as UserCtx);

export const UsersProvider = ({ children }: PropsWithChildren) => {
  const initialState = { users: [] as UserData[] };

  const actions = {
    storeUsers(state: State, action: Action) {
      const users = action.payload;
      return { ...state, users } as State;
    },
    createUser(state = initialState, action: Action) {
      const user = action.payload;
      if (Array.isArray(user)) return;
      user.id = Math.random();
      user.avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/33.jpg`;
      const copyOfUsers = [...state.users];
      return { ...state, users: [...copyOfUsers, user] } as State;
    },
    updateUser(state = initialState, action: Action) {
      const updated = action.payload;
      if (Array.isArray(updated)) return;
      const userUpdate = state.users.map((u) => {
        if (u.id !== updated.id) return u;

        return updated;
      });

      return { ...state, users: userUpdate } as State;
    },
    deleteUser(state = initialState, action: Action) {
      const user = action.payload;
      if (Array.isArray(user)) return;
      return { ...state, users: state.users.filter((u) => u.id !== user.id) } as State;
    },
  };

  function reducer(state: State, action: Action) {
    const stateWillEvolve = actions[action.type as keyof typeof actions];

    return stateWillEvolve(state, action) ?? state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

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

export const useUserContext = () => useContext(UsersContext);
