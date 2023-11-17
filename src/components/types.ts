// types.ts

import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Mapa: undefined;
  AddLocation: { onLocationAdded: (newLocation: { title: string; latitude: number; longitude: number }) => void };
};

export type MapComponentScreenRouteProp = RouteProp<RootStackParamList, 'Mapa'>;
export type AddLocationScreenRouteProp = RouteProp<RootStackParamList, 'AddLocation'> | undefined;
