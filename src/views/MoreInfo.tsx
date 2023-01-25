import { View, Text } from 'react-native';
import React from 'react';

//@TO DO: Remove any type
const MoreInfo = ({ route }: any) => {
  const user = route?.params;
  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>City: {user.address.city}</Text>
      <Text>Street: {user.address.street}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Website: {user.website}</Text>
      <View>
        <Text>Company: {user.company.name}</Text>
        <Text>Catch Phrase: {user.company.catchPhrase}</Text>
      </View>
    </View>
  );
};

export default MoreInfo;
