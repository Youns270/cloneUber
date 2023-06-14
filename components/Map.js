// Import des composants nécessaires depuis les modules 'react-native'
import { View, Text } from 'react-native';

// Import des modules React
import React, { useRef, useEffect } from 'react';

// Import des fonctions nécessaires depuis le module 'react-redux'
import { useDispatch, useSelector } from "react-redux";

// Import des composants MapView et Marker depuis le module 'react-native-maps'
import MapView, { Marker } from 'react-native-maps';

// Import des sélecteurs et de l'action depuis le module 'navSlice'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';

// Import du composant MapViewDirections depuis le module 'react-native-maps-directions'
import MapViewDirections from 'react-native-maps-directions';

// Import de la clé d'API Google Maps depuis le module '@env'
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // Ajustement de la carte pour afficher les marqueurs d'origine et de destination
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
        });
    }, [origin, destination]);

    useEffect(() => {
        if (origin) {
            // Logique lorsque l'origine est mise à jour
            console.log(`Origin: ${origin.location} is a ${typeof(origin.location)} \n ${origin.description}\n`);
        } else {
            // Logique lorsque l'origine est vide
            console.log("🤐🤐");
        }
    }, [origin]);

    useEffect(() => {
        if (destination) {
            // Logique lorsque la destination est mise à jour
            console.log(`Destination: ${destination.location} is a ${typeof(destination.location)} \n ${destination.description}\n`);
        } else {
            // Logique lorsque la destination est vide
            console.log("🙃🙃");
        }
    }, [destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async() => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            )
            .then(res => res.json())
            .then(data => {
                // Dispatch de l'action pour définir les informations sur le temps de trajet
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref={mapRef}
            style={{ height: "100%", width: "100%" }}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {/* Affichage de l'itinéraire si l'origine et la destination sont définies */}
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
    
            {/* Affichage du marqueur d'origine s'il est défini */}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}
    
            {/* Affichage du marqueur de destination s'il est défini */}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    );
}
export default Map;
