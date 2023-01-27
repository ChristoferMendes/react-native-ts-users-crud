import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import { Navigation } from '../../../App';

export function HeaderRightButton() {
  const navigation = useNavigation();
  console.log(Object.keys(navigation));
  return (
    <>
      <Button
        onPress={() => navigation.navigate('UserForm')}
        type="clear"
        icon={<Icon name="add" tvParallaxProperties={true} size={25} color={'#fff'} />}
      />
    </>
  );
}
