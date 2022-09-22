import { View, FlatList, Alert } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import { Navigation } from '../../App';
import UsersContext from '../contexts/UsersContext';

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
}

const UserList = ({ navigation }: Navigation) => {
  const { users, state, dispatch } = useContext(UsersContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users/');
      const usersData: [UserData] = await data.json();

      dispatch({ type: 'loadUsers', payload: usersData });
    };

    fetchUsers();
  }, [users]);

  const confirmUserDeletion = (item: UserData) => {
    Alert.alert('Delete user', 'Do you like to delete this user?', [
      {
        text: 'Yes',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: item,
          });
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const RenderUsers = ({ item }: { item: UserData }) => {
    const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${item.id}.jpg`;
    return (
      <ListItem
        bottomDivider
        hasTVPreferredFocus={undefined}
        tvParallaxProperties={undefined}
        onPress={() => {
          navigation.navigate('MoreInfo', item);
        }}
      >
        <Avatar title={item.name} size={40} source={{ uri: item.avatar ?? avatar }} rounded={true} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
          iconProps={{ name: 'edit' }}
          iconStyle={{ fontSize: 30, color: 'orange' }}
          onPress={() => navigation.navigate('UserForm', item)}
        />
        <ListItem.Chevron
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
          iconProps={{ name: 'delete' }}
          iconStyle={{ fontSize: 30, color: 'red' }}
          onPress={() => confirmUserDeletion(item)}
        />
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList data={state?.users} renderItem={RenderUsers} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

export default UserList;
