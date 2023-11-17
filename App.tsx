import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from './src/components/MapComponent.1';
import HeaderRightButton from './src/components/HeaderRightButton';
import LocationCards from './src/components/LocationCards';
import { marker } from './src/data/Marker';
import LocationDetail from './src/components/LocationDetail';
import LocationScreen from './src/components/LocationScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const [showLocationCards, setShowLocationCards] = useState(false);

  const openLocationCards = () => {
    setShowLocationCards(true);
  };

  const closeLocationCards = () => {
    setShowLocationCards(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Mapa"
        screenOptions={{ headerRight: () => <HeaderRightButton onPress={openLocationCards} /> }}>
        <Stack.Screen name="Mapa" component={MapComponent} options={{ title: 'Mapa' }} />
        <Stack.Screen name="DetailLocal" component={LocationDetail} options={{title: 'Detalhes da localização'}}/>
        <Stack.Screen name="AddLocation" component={LocationScreen} options={{title: 'Adicionar localização'}}/>
      </Stack.Navigator>

      {showLocationCards && (
        <LocationCards
          locations={marker}
          onClose={closeLocationCards}
        />
      )}
    </NavigationContainer>
  );
}

export default App;
