import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavoris from './NavFavoris';
import { Icon } from 'react-native-elements';

const NavigationCarte = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/* Titre */}
      <Text style={tw`text-center py-5 text-2xl font-bold text-black`}>Commandez une course</Text>

      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          {/* Zone de recherche de destination */}
          <GooglePlacesAutocomplete
            placeholder='Indiquez votre destination...'
            styles={toInputeBoxStyles}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description
              }));
              navigation.navigate('ConduireOptionCarte');
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "fr"
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
        </View>

        {/* Liste des favoris */}
        <NavFavoris />
      </View>

      {/* Boutons de commande */}
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        {/* Bouton Trajet */}
        <TouchableOpacity onPress={() => navigation.navigate('ConduireOptionCarte')} style={tw`flex flex-row justify-center bg-black w-24 py-3 rounded-full`}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center ml-1`}>Trajet</Text>
        </TouchableOpacity>
        
        {/* Bouton Mangez */}
        <TouchableOpacity style={tw`flex-row bg-white justify-evenly py-2 my-auto`}>
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
          <Text style={tw`text-center ml-3`}>Mangez</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigationCarte;

const toInputeBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
