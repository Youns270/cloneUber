import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: null, // Le lieu de départ initial est défini sur null
  destination: null, // La destination initiale est définie sur null
  travelTimeInformation: null // Les informations sur le temps de trajet initial sont définies sur null
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload; // Met à jour le lieu de départ avec la valeur passée dans l'action
    },
    setDestination: (state, action) => {
      state.destination = action.payload; // Met à jour la destination avec la valeur passée dans l'action
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload; // Met à jour les informations sur le temps de trajet avec la valeur passée dans l'action
    }
  }
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;


export const selectOrigin = (state) => state.nav.origin; // Sélecteur pour obtenir le lieu de départ du state
export const selectDestination = (state) => state.nav.destination; // Sélecteur pour obtenir la destination du state
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation; // Sélecteur pour obtenir les informations sur le temps de trajet du state

export default navSlice.reducer;
