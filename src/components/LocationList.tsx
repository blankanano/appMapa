// LocationList.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Location = {
  title: string;
  latitude: number;
  longitude: number;
};

type LocationListProps = {
  navigation: StackNavigationProp<any, any>;
  onSelectLocation: (location: Location) => void;
  locations: Location[];  // Adicionado a propriedade locations
};

const LocationList: React.FC<LocationListProps> = ({ navigation, onSelectLocation, locations }) => {
  const handleLocationPress = (location: Location) => {
    onSelectLocation(location);
    navigation.navigate('LocationDetail', { location });
  };

  return (
    <View style={styles.container}>
      {locations.map((location, index) => (
        <TouchableOpacity key={index} onPress={() => handleLocationPress(location)}>
          <Text>{location.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationList;
