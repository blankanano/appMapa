import React, { useState } from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from './src/components/MapComponent';
import HeaderRightButton from './src/components/HeaderRightButton';
import LocationCards from './src/components/LocationCards';
import LocationDetail from './src/components/LocationDetail';
import LocationScreen from './src/components/LocationScreen';
import { Locais } from './src/data/Marker';
import { LocationContext } from './src/context/LocationContext';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
  }
}

const StackNavigator = createStackNavigator();

function App(): JSX.Element {
  const [myLocations, setMyLocations] = useState(Locais); 
  const [showLocationCards, setShowLocationCards] = useState(false);

  const openLocationCards = () => {
    setShowLocationCards(true);
  };

  const closeLocationCards = () => {
    setShowLocationCards(false);
  };

  return (
    <PaperProvider theme={theme}>
      <LocationContext.Provider value={{
        meusLocais: myLocations,
        setMeusLocais: setMyLocations,  
      }}>
        <NavigationContainer>
          <StackNavigator.Navigator
            initialRouteName="Mapa"
            screenOptions={{ headerRight: () => <HeaderRightButton onPress={openLocationCards} /> }}>
            <StackNavigator.Screen name="Mapa" component={MapComponent} options={{ title: 'Mapa' }} />
            <StackNavigator.Screen name="DetailLocal" component={LocationDetail} options={{title: 'Detalhes da localização'}}/>
            <StackNavigator.Screen name="AddLocation" component={LocationScreen} options={{title: 'Adicionar localização'}}/>
          </StackNavigator.Navigator>

          {showLocationCards && (
          <LocationCards
            locations={myLocations}
            onClose={closeLocationCards}
          />
        )}

        </NavigationContainer>
      </LocationContext.Provider>
    </PaperProvider>
  );
}

export default App;