import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'twrnc';

// Données des favoris
const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Domicile',
        destination: 'Sevran, Île-de-France, France',
    },
    {
        id: '456',
        icon: 'briefcase',
        location: 'Travail',
        destination: 'Guyancourt, Île-de-France, France',
    },
];

const NavFavoris = () => {
  return (
    <FlatList 
        data={data} 
        keyExtractor={(item) => item.id}
        renderItem={({ item: { location, destination, icon }, index }) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
              {/* Icône */}
              <Icon
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                name={icon}
                type="ionicon"
                color="white"
                size={18}
              />
              <View>
                {/* Lieu */}
                <Text style={tw`font-semibold text-lg`}>{location}</Text>
                {/* Destination */}
                <Text style={tw`text-gray-500`}>{destination}</Text>
              </View>
              {/* Ligne séparatrice pour le premier élément */}
              {index === 0 && (
                <View
                  style={{
                    backgroundColor: 'gray',
                    height: 1,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                />
              )}
            </TouchableOpacity>
        )}
    />
  );
};

export default NavFavoris;

const styles = StyleSheet.create({});
