import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './src/views/UserList';
import UserForm from './src/views/UserForm';
import { Button, Icon } from 'react-native-elements';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList" screenOptions={screenOptions}>
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={() => {
            return {
              title: 'Users List',
              headerRight: () => (
                <Button
                  type="clear"
                  icon={<Icon name="add" size={25} color={'#fff'} tvParallaxProperties={undefined} />}
                />
              ),
            };
          }}
        />
        <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Users form' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
