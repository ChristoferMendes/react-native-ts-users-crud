import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import UserList, { UserData } from './src/views/UserList';
import UserForm from './src/views/UserForm';
import { UsersProvider } from './src/contexts/UsersContext';
import MoreInfo from './src/views/MoreInfo';
import { HeaderRightButton } from './src/components/HeaderRightButton';

const Stack = createNativeStackNavigator();

export type Navigation = NativeStackScreenProps<{ UserForm: UserData | undefined; MoreInfo: UserData }>;

export default function App() {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList" screenOptions={screenOptions}>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={() => {
              return {
                title: 'Users List',
                headerRight: HeaderRightButton,
              };
            }}
          />
          <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Users form' }} />
          <Stack.Screen name="MoreInfo" component={MoreInfo} options={{ title: 'More info' }} />
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
