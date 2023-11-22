import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';
import LocationCards from './LocationCards';
import { AddLocationScreenRouteProp } from './types';
import { LocationContext } from '../context/LocationContext';

const MapComponent: React.FC = () => {
  const { meusLocais, setMeusLocais } = useContext(LocationContext);
  const [userLocation, setUserLocation] = useState<{ title: string; latitude: number; longitude: number } | null>(null);
  const [showLocationCards, setShowLocationCards] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<AddLocationScreenRouteProp>();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const addLocais = (newLocation: { title: string; latitude: number; longitude: number }) => {
    setMeusLocais([
      ...meusLocais,
      {
        title: newLocation.title,
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      },
    ]);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permission === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                title: 'Minha localização',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              addLocais(userLocation);
              setUserLocation(userLocation);
              setRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
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

  const openAddLocationScreen = () => {
    const routeParams: AddLocationScreenRouteProp = {
      onLocationAdded: handleLocationAdded,
    };

    navigation.navigate('AddLocation', routeParams);
  };

  const handleLocationAdded = (newLocation: { title: string; latitude: number; longitude: number }) => {
    addLocais(newLocation);
    setShowLocationCards(false);
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <React.Fragment>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          >
            {/* Marcador da localização do usuário */}
            {userLocation && (
              <Marker
                title={userLocation.title}
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
              />
            )}

            {/* Marcadores para os locais */}
            {meusLocais.map((location, index) => (
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
        </React.Fragment>
      )}

      {!userLocation && <Text>Aguardando permissão de localização...</Text>}

      {showLocationCards && (
        <LocationCards
          locations={meusLocais}
          userLocation={userLocation}
          onLocationPress={(location) => {
            console.log('Localização pressionada: ', location);
            setRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          onClose={() => setShowLocationCards(false)}
        />
      )}

      {/* Botão de Adicionar Localização */}
      <TouchableOpacity style={styles.addButton} onPress={openAddLocationScreen}>
        <Text style={styles.addButtonText}>Adicionar localização</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'green',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MapComponent;