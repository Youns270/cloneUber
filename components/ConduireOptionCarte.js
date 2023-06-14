import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';
import tw from 'twrnc';

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
  {
    id: "Uber-LUX-101112",
    title: "Uber SUV",
    multiplier: 2,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_549,h_366/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png",
  },
];

const SURGE_CHARGE_PRICE = 1.5;

const ConduireOptionCarte = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        {/* Bouton de retour */}
        <TouchableOpacity onPress={() => { console.log("😡😡😡"); navigation.navigate("NavigationCarte"); }} style={tw`absolute p-3 rounded-full top-3 left-5 z-50`}>
          <Icon name="chevron-left" type="font-awesome" size={14} />
        </TouchableOpacity>
        {/* Affichage de la distance du trajet */}
        <Text style={tw`text-center text-xl py-5 font-bold`}>
          Distance du trajet : {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      {/* Liste des options de conduite */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={tw`bg-gray-200 h-[0.5px]`} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              tw`flex-row justify-between items-center px-5`,
              item.id === selected?.id ? tw`bg-gray-300` : null
            ]}
            onPress={() => {
              if (!selected) {
                setSelected(item);
              } else {
                setSelected(null);
              }
            }}
          >
            {/* Image de l'option de conduite */}
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`ml-[-10]`}>
              {/* Titre de l'option de conduite */}
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              {/* Durée du trajet */}
              <Text>durée : {travelTimeInformation?.duration?.text}</Text>
            </View>
            {/* Prix de l'option de conduite */}
            <Text style={tw`text-xl font-bold`}>
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR'
              }).format(
                (travelTimeInformation?.duration?.value * SURGE_CHARGE_PRICE * item.multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Bouton de choix de l'option de conduite */}
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected} style={[tw`bg-black py-3 m-3`, !selected ? tw`bg-gray-400` : null]}>
          <Text style={tw`text-center text-white text-xl`}>Choisir {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ConduireOptionCarte;
