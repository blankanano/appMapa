import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Location = {
  title: string;
  latitude: number;
  longitude: number;
};

type LocationListProps = {
  navigation: StackNavigationProp<any, any>; // Ou defina suas rotas corretamente aqui
};

const LocationList: React.FC<LocationListProps> = ({ navigation }) => {
  const locations: Location[] = [
    { title: 'House Family', latitude: -25.464553919848772, longitude: -49.55269216179718 },
    { title: 'RN Soccer e Beach Sports', latitude: -25.452727327632527, longitude: -49.534343804126514 },
  ];

  const handleLocationPress = (location: Location) => {
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