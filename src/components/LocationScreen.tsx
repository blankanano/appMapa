import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LocationScreen: React.FC<{ route: { params: { onLocationAdded: (location: { title: string; latitude: number; longitude: number }) => void } } }> = ({ route }) => {
  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const navigation = useNavigation();

  const addLocation = () => {
    const newLocation = {
      title: title,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    // Chama a função de callback para adicionar a nova localização
    route.params.onLocationAdded(newLocation);

    // Retorna para a tela anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Latitude:</Text>
      <TextInput style={styles.input} value={latitude} onChangeText={setLatitude} keyboardType="numeric" />

      <Text style={styles.label}>Longitude:</Text>
      <TextInput style={styles.input} value={longitude} onChangeText={setLongitude} keyboardType="numeric" />

      <Button title="Adicionar Localização" onPress={addLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LocationScreen;
