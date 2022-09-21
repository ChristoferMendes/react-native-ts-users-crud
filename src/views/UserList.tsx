import { View, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import { Navigation } from '../../App';

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList = ({ navigation }: Navigation) => {
  const [users, setUsers] = useState<[UserData] | []>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users/');
      const usersData: [UserData] = await data.json();

      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const confirmUserDeletion = (item: UserData) => {
    Alert.alert('Delete user', 'Do you like to delete this user?', [
      {
        text: 'Yes',
        onPress() {
          console.warn('Deleted ' + item.id);
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
          navigation.navigate('UserForm', item);
        }}
      >
        <Avatar title={item.name} size={40} source={{ uri: avatar }} rounded={true} />
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
      <FlatList data={users} renderItem={RenderUsers} keyExtractor={(item) => item.id.toString()} />
    </View>
  );
};

export default UserList;
