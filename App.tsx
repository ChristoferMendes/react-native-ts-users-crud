import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import UserList, { UserData } from './src/views/UserList';
import UserForm from './src/views/UserForm';
import { Button, Icon } from 'react-native-elements';
import { UsersProvider } from './src/contexts/UsersContext';

const Stack = createNativeStackNavigator();

export type Navigation = NativeStackScreenProps<{ UserForm: UserData | undefined }>;

export default function App() {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList" screenOptions={screenOptions}>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }: Navigation) => {
              return {
                title: 'Users List',
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={
                      <Icon
                        name="add"
                        size={25}
                        color={'#fff'}
                        tvParallaxProperties={undefined}
                        onPress={() => navigation.navigate('UserForm')}
                      />
                    }
                  />
                ),
              };
            }}
          />
          <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Users form' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
