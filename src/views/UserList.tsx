import { View, FlatList } from 'react-native';
import { useEffect } from 'react';
import { useUserContext } from '../contexts/UsersContext';
import { RenderUsers } from '../components/RenderUsers';

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
}

const UserList = () => {
  const { state, dispatch } = useUserContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users/');
      const usersData: UserData[] = await data.json();

      dispatch({ type: 'storeUsers', payload: usersData });
    };

    fetchUsers();
  }, []);

  const renderUsers = ({ item }: { item: UserData }) => <RenderUsers item={item} />;

  return (
    <View>
      <FlatList data={state?.users} renderItem={renderUsers} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

export default UserList;
