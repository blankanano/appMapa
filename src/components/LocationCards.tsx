import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Location } from './LocationList';

interface LocationCardsProps {
  locations: Location[];
  userLocation?: Location | null;
  onLocationPress: (location: Location) => void;
  onClose: () => void;
}

const LocationCards: React.FC<LocationCardsProps> = ({ locations, userLocation, onLocationPress, onClose }) => {
  const allLocations = userLocation ? [userLocation, ...locations] : locations;

  return (
    <View style={styles.container}>
      <FlatList
        data={allLocations}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              console.log('Localização selecionada:', item);
              onLocationPress && onLocationPress(item);
              onClose();
            }}
          >
            <Text>{item.title}</Text>
            <Text>{`Latitude: ${item.latitude}`}</Text>
            <Text>{`Longitude: ${item.longitude}`}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LocationCards;
