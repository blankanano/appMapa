import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request } from 'react-native-permissions';
import { Location } from './LocationList';
import { useNavigation, useRoute } from '@react-navigation/native';  // Importe useRoute
import LocationCards from './LocationCards';
import { MapComponentScreenRouteProp, AddLocationScreenRouteProp } from './types';
import { marker } from '../data/Marker';

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{title: string; latitude: number; longitude: number } | null>(null);
  const [showLocationCards, setShowLocationCards] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<AddLocationScreenRouteProp>();  // Adicione o hook useRoute

  const [newLocation, setNewLocation] = useState<{ title: string; latitude: number; longitude: number } | null>(null);
  // const [locations, setLocations] = useState<Location[]>([
  //   { title: 'House Family', latitude: -25.464553919848772, longitude: -49.55269216179718 },
  //   { title: 'RN Soccer e Beach Sports', latitude: -25.452727327632527, longitude: -49.534343804126514 },
  // ]); 

  const [locations, setLocations] = useState(marker); 

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permission === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                title: 'Minha localização',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.log('Permissão de localização negada');
        }
      } catch (error) {
        console.error(error);
      }
    };

    requestLocationPermission();
  }, []);

  const openLocationCards = () => {
    console.log('Botão pressionado!');
    setShowLocationCards(true);
  };

  const openAddLocationScreen = () => {
    const routeParams: AddLocationScreenRouteProp = {
      onLocationAdded: handleLocationAdded,
    };

    navigation.navigate('AddLocation', routeParams);
  };
  
  const handleLocationAdded = (newLocation: { title: string; latitude: number; longitude: number }) => {
    setLocations([...locations, newLocation]);
    setShowLocationCards(false);
  };  

  return (
    <View style={styles.container}>
      {userLocation && (
        <React.Fragment>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              title={userLocation.title}
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
            />

            {locations.map((location, index) => (
              <Marker
                key={index}
                title={location.title}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
              />
            ))}
          </MapView>

          <TouchableOpacity style={styles.menuButton} onPress={openLocationCards}>
            <Text style={styles.menuButtonText}>☰</Text>
          </TouchableOpacity>
        </React.Fragment>          
      )}

      {!userLocation && <Text>Aguardando permissão de localização...</Text>}

      {showLocationCards && (
        <LocationCards
          locations={locations}
          onClose={() => setShowLocationCards(false)}
        />
      )}

      {/* Botão de Adicionar Localização */}
      <TouchableOpacity style={styles.addButton} onPress={openAddLocationScreen}>
        <Text style={styles.addButtonText}>Adicionar marker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '95%',
  },
  menuButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 20,
  },
  headerButton: {
    marginRight: 16,
    padding: 8,
  },  
  addButton: {
    backgroundColor: 'green',
    height: 40,
  },  
  addButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MapComponent;