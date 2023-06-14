import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

// Données pour les options de navigation
const data = [
  {
    id: "123",
    title: "Faire un tour",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Commander",
    image: "https://links.papareact.com/28w",
    screen: "OrderScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin); // Sélection de l'origine depuis le Redux store

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={[
            tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`,
            !origin && { opacity: 0.2 }, // Définition de l'opacité conditionnelle
          ]}
          disabled={!origin} // Désactiver le bouton si l'origine n'est pas définie
        >
          <View style={tw`${!origin ? "opacity-20" : ""}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
