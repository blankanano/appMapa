import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type Location = {
  title: string;
  latitude: number;
  longitude: number;
};

type RootStackParamList = {
  LocationDetail: { location: Location };
};

type LocationDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'LocationDetail'>;
};

const LocationDetail: React.FC<LocationDetailScreenProps> = ({ route }) => {
  const { location } = route.params;

  return (
    <View>
      <Text>Detalhes do Local</Text>
      <Text>Nome: {location.title}</Text>
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>
    </View>
  );
};

export default LocationDetail;
