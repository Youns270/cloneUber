import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../components/Map';
import NavigationCarte from '../components/NavigationCarte';
import ConduireOptionCarte from '../components/ConduireOptionCarte';
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      {/* Bouton de menu */}
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw`absolute bg-gray-100 p-3 rounded-full top-16 left-8 shadow-lg z-50`}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      
      {/* Vue du haut avec la carte */}
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      {/* Vue du bas avec la navigation et les options de conduite */}
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          {/* Écran de navigation */}
          <Stack.Screen
            name="NavigationCarte"
            component={NavigationCarte}
            options={{
              headerShown: false,
            }}
          />
          {/* Écran des options de conduite */}
          <Stack.Screen
            name="ConduireOptionCarte"
            component={ConduireOptionCarte}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({});
