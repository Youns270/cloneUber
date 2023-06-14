import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavoris from '../components/NavFavoris';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 5 }}>
            <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }}
                />

                {/* Barre de recherche pour saisir le lieu de prise en charge */}
                <GooglePlacesAutocomplete
                    placeholder="Saisissez le lieu de prise en charge"
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        // Définir l'origine sélectionnée dans le Redux store
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }));

                        // Réinitialiser la destination sélectionnée
                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'fr',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                {/* Options de navigation */}
                <NavOptions />

                {/* Favoris de navigation */}
                <NavFavoris />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
