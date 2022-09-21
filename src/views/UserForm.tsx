import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { UserData } from './UserList';
import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface RouteProps {
  route: { params: UserData };
  navigation: NativeStackNavigationProp<{ UserList: undefined }>;
}

const UserForm = ({ route, navigation }: RouteProps) => {
  const [user, setUser] = useState<UserData | undefined>(route.params ? route.params : undefined);

  return (
    <View style={styles.form}>
      <View>
        <Text>Name</Text>
        <TextInput
          onChangeText={(name) => user && setUser({ ...user, name })}
          placeholder="Tell the name"
          value={user?.name}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={(email) => user && setUser({ ...user, email })}
          placeholder="Tell the email"
          value={user?.email}
          style={styles.input}
        />
      </View>
      <View>
        <Button
          title={'Save'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default UserForm;
