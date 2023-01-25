import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { useUserContext } from '../../contexts/UsersContext';
import { UserData } from '../../views/UserList';

export function RenderUsers({ item }: { item: UserData }) {
  const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${item.id}.jpg`;
  const navigation = useNavigation<any>();
  const { dispatch } = useUserContext();

  const confirmUserDeletion = (item: UserData) => {
    Alert.alert('Delete user', 'Do you want to delete this user?', [
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
}
